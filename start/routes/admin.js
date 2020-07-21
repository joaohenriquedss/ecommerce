'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {
  /**
   * Categorias
   */
  Route.resource('categories', 'CategoryController').apiOnly()
  /**
   * Produtos
   */
  Route.resource('products', 'ProductController').apiOnly()
  /**
   *Cupom
   */
  Route.resource('coupons', 'CouponController').apiOnly()
  /**
   * Order
   */
  Route.resource('orders', 'OrderController').apiOnly()
  /**
   * Imagem
   */
  Route.resource('images', 'ImageController').apiOnly()
  /**
   * Usuario
   */
  Route.resource('users', 'UserController').apiOnly()

}).prefix('v1/admin').namespace('Admin')
