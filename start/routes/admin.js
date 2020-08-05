'use strict'

/** @type {typeof import('../../a/@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {
  /**
   * Categorias
   */
  Route.resource('categories', 'Admin/CategoryController').apiOnly()
  /**
   * Produtos
   */
  Route.resource('products', 'Admin/ProductController').apiOnly()
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

}).prefix('v1/admin')
