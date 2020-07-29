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
    Route.post('register', 'Auth/AuthController.register').as('auth.register')
    Route.post('login', 'Auth/AuthController.login').as('auth.login')
    Route.post('refresh','Auth/AuthController.refresh').as('auth.refresh')
    Route.post('logout','Auth/AuthController.logout').as('auth.logout')

    // resetar senha rotas

    Route.post('reset-password', 'Auth/AuthController.forgot').as('auth.forgot')
    Route.get('reset-password', 'Auth/AuthController.remember').as('auth.remember')
    Route.put('reset-passorwd','Auth/AuthController.reset').as('auth.reset')

  }).prefix('v1/auth')
