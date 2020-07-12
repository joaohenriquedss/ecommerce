'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  /**
   * Relacionamento entre categora e Imagem em destaque
   */

   image(){
     return this.belongsTo('App/Models/Image')
   }

   /**
    * Relacionamento entre categoria e produtos
    */
   products(){
     return this.belongsTo('App/Models/Product')
   }
}

module.exports = Category
