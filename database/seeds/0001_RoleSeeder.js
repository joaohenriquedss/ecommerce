'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Role = use('Role') // Model
/**
 * Criar entidades
 */
class RoleSeeder {
  async run() {
    await Role.create({
      // Criando o Admin
      name: 'Admin',
      slug: 'admin',
      description: 'Administrador do sistema'
    })
    // Criar o cargo de gerente
    await Role.create({
      name: 'Manager',
      slug: 'manger',
      description: 'Gerente da loja'
    })
    // criar cargo de cliente
    await Role.create({
      name: 'Client',
      slug: 'client',
      description: 'Cliente da Loja'
    })
  }



}

module.exports = RoleSeeder
