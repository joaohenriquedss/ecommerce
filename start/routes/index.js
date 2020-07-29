 'use strict'


/** @type {typeof import('../../a/@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

/**
 * Importa rotas de autenticacao
 */
require('./auth')

/**
 * Importa rotas de Admin
 */

 require('./admin')

 /**
  * Importar rotas de Clientes
  */
 require('./client')
