'use strict'

/** @type {typeof import('../../a/@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**
 * Auth Routs
 */

/**
 * Agrupar rotas
 */

Route.group(() => {
  Route.post('register', 'Auth/AuthController.register').as('auth.register').middleware(['guest'])
  Route.post('login', 'Auth/AuthController.login').as('auth.login').middleware(['guest'])
  Route.post('refresh', 'Auth/AuthController.refresh').as('auth.refresh').middleware(['guest'])
  Route.post('logout', 'Auth/AuthController.logout').as('auth.logout').middleware(['auth'])

  // resetar senha rotas

  Route.post('reset-password', 'Auth/AuthController.forgot').as('auth.forgot').middleware(['auth'])
  Route.get('reset-password', 'Auth/AuthController.remember').as('auth.remember').middleware(['auth'])
  Route.put('reset-passorwd', 'Auth/AuthController.reset').as('auth.reset').middleware(['auth'])

}).prefix('v1/auth')
