'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CouponProductSchema extends Schema {
  up () {
    this.create('coupon_product', (table) => {
      table.increments()
      table.integer('coupon_id')
      table.integer('product_id')
      table.timestamps()

      table
      .foreign('coupon_id')
      .references('id')
      .inTable('coupons')
      .onDelete('cascade')

      table
      .foreign('product_id')
      .references('id')
      .inTable('products')
      .onDelete('cascade')
    })
  }

  down () {
    this.drop('coupon_product')
  }
}

module.exports = CouponProductSchema
