'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ImageSchema extends Schema {
  up () {
    this.create('images', (table) => {
      table.increments()
      table.string('path', 255)
      table.integer('size')
      table.string('original_name',100)
      table.string('extension', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('images', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ImageSchema
