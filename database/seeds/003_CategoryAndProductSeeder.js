'use strict'

/*
|--------------------------------------------------------------------------
| CategoryAndProductSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class CategoryAndProductSeeder {
  async run () {
    const categorias = await Factory.model('App/Models/Category').createMany(10)

    await Promise.all(
      categorias.map(async category => {
        const produts = await Factory.model('App/Models/Product').createMany(5)
        await Promise.all(produts.map(async produt => {
          await produt.categorias().attach([category.id])
        }))
      })


    )
  }
}

module.exports = CategoryAndProductSeeder
