'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  image() {
    return this.belongsTo('App/Models/Image')
  }

  /**
   * Relacionamento entre produto e imagens(galeria)
   */
   // varias imagens para um
   images(){
     return this.belongsToMany('App/Models/Image')
   }
   // varios produtos em uma categoria
   categories(){
     return this.belongsToMany('App/Models/Category')
   }
   // Um cupom por produto

   cupons() {
     return this.belongsToMany('App/Models/Coupon')
   }
}

module.exports = Product
