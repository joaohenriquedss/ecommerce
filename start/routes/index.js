 'use strict'


/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
}).as('home')

/**
 * Importa rotas de autenticacao
 */
require('./auth')

/**
 * Importa rotas de Admin
 */

 require('./admin')

 /**
  * IMportar rotas de Clientes
  */
 require('./client')
