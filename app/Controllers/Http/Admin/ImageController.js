'use strict'

const Helpers = require('../../../Helpers')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with images
 */
const Image = use('App/Models/Image')
const {manage_single_upload, manage_multiplos_uploads} = use('App/Helpers')
const fs = use('fs')

class ImageController {
  /**
   * Show a list of all images.
   * GET images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response, pagination }) {
    const images = await Image.query()
      .orderBy('id', 'DESC')
      .paginate(pagination.page, pagination.limit)

    return response.send(images)
  }
  /**
   * Create/save a new image.
   * POST images
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      const fileJar = request.file('imagens', {
        types: ['image'],
        size: '3mb'
      })

      let images = []
      // unico arquivo
      if(!fileJar.files){
        const file = await manage_single_upload(fileJar)
        if(file.moved()){
          const image = await Image.create({
            path: file.fileName,
            size: file.size,
            original_name: file.clientName,
            extension: file.subtype,
          })

          images.push(image)
          return response.status(201).send({successes: images, errors : {} })
        }
        else {
          return response.status(400).send({
            message: 'Nao foi possivel processar esta image no momento!'
          })
        }
      }
      // varias imagens
      let files = await manage_multiplos_uploads(fileJar)

      await Promise.all(
        files.successes.map(async file => {
          const image = await Image.create({
            path : file.fileName,
            size : file.size,
            original_name : file.clientName,
            extension: file.subtype
          })
          imagens.push(image)
        })
      )
      return response.status(201).send({successes, error: files.error})
    } catch (error) {
      return response.status(400).send({
        message: 'Não foi possivel processar imagem'
      })
    }
  }
  /**
   * Display a single image.
   * GET images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params : {id}, request, response, view }) {
    const image = await Image.findOrFaitl(id)
    return response.send(image)
  }
  /**
   * Update image details.
   * PUT or PATCH images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params : {id}, request, response }) {
    const image = Image.findOrFaitl(id)
    try {
      image.merge(request.only(['original_name']))
      await image.save()
      response.status(200).send(image)
    } catch (error) {
      return response.status(400).send({
        message: 'Nao foi possivel atualizar esta imagem'
      })
    }
  }

  /**
   * Delete a image with id.
   * DELETE images/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const image = await Image.findOrFaitl(id)
    try {
      let filepath = Helpers.publicPath(`uploads/${image.path}`)

      await fs.unlink(filepath, err => {
        if(!err) {
          await image.delete()
        }
      })
      return response.status(204).send()
    } catch (error) {
      return response.status(400).send({
        message : 'Nao foi possivel deleter'
      })
    }

  }
}

module.exports = ImageController
