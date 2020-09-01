'use strict'
const Database = use('Database')

class OrderService {
  constructor(model, trx = false) {
    this.model = model
    this.trx = trx
  }
  async syncItemns(items) {
    if (!Array.isArray(items)) {
      return false
    }

    await this.model.items().delete(this.trx)
    await this.model.items.createMany(items, this.trx)

  }
  async updateItems(items) {
    let currentItems = await this.model
      .items()
      .whereIn('id', items.map(item => item.id))
      .fetch()
    // delete os itens que o user não quer mais
    await this.model
      .items()
      .whereIn('id', items.map(item => item.id))
      .delete(this.trx)

    // Atualiza os valores e quantidades
    await Promise.all(currentItems.rows.map(async item => {
      item.fill(items.find(n => n.id === item.id))
      await item.save(this.trx)
    }))

  }
  async canApplyDiscount(coupon) {
    const now = new Date().getTime()
    if (now > coupon.valid_from.getTime() || (typeof coupon.valid_until == 'object' && coupon.valid_until.getTime() < now)) {
      return false
    }
    const couponProducts = await Database
      .from('coupon_products')
      .where('coupon_id', coupon.id)
      .pluck('product_id')
    // 'product_id => 1,product_id => 2'

    const couponClients = await Database.from('coupon_user')
      .where('coupon_id', coupon.id)
      .pluck('user_id')
    // verificar se o cupom não está associado a produtos e clientes especificos
    if (Array.isArray(couponProducts) &&
      couponProducts.length < 1 &&
      Array.isArray(couponClients) &&
      couponClients < 1) {
      return true
    }
    let isAssociatedProducts, isAssociatedClients = false

    if (Array.isArray(couponProducts) && couponProducts.length > 0) {
      isAssociatedProducts = true
    }

    if (Array.isArray(couponClients) && couponClients.length > 0) {
      isAssociatedClients = true
    }

    const productsMatch = await Database
      .from('order_items')
      .where('order_id', this.model.id)
      .whereIn('product_id', couponProducts)
      .pluck('product_id')

    /**
     * Uso 1 - O cupom esta associado a clientes e produtos
     */
    if (isAssociatedClients && isAssociatedProducts) {
      const clienMatch = couponClients.find(
        client => client === this.model
      )
      if (clienMatch && Array.isArray(productsMatch) && productsMatch.length > 0) {
        return true
      }
    }
    /**
     * caso 2 - coupon associado apenas a produto
     */
    if (isAssociatedProducts && Array.isArray(productsMatch) && productsMatch.length > 0) {
      return true
    }
    /**
     * 3 - o cupom está associado a 1 ou mais clientes
     */
    if (isAssociatedClients && Array.isArray(couponClients) && couponClients.length > 0) {
      const match = couponClients.find(client => client == this.model.user_id)
      if (match) {
        return true
      }
    }
    /**
     * caso nenhuma positiva
     * então o cupom está associado a cliente ou produtos ou os dois
     * porém nenhum dos produtos deste pedido está legivel ao desconto
     */
    return false
  }
}
module.exports = OrderService
