'use stric'

const { patch } = require("@adonisjs/framework/src/Route/Manager")

const crypto = use('crypto')
const Helpers = use('Helpers')

/**
 * Generate random string

 */

 const str_random = async(length = 40) => {
   let string = ''
   let len = string.length

   if(len < length) {
     let size = length - len
     let bytes = await crypto.randomBytes(size)
     let buffer = Buffer.from(bytes)
     string += buffer
     .toString('base64')
     .replace(/[^a-zA-Z0-9]/g,'')
     .substr(0,size)
   }
   return string
 }

 /**
  * Move um unico arquivo para o caminho especificado se nenhum
  * for especificado entao 'public/uploads' sera utilizado
  */

  const manage_single_upload = async(file, path = null) => {
    path = path ? path : Helpers.publicPath('uploads')
    // gera um nome aleatŕio
    const random_name = await str_random(30)
    let filename = `${new Date().getTime()}-${random_name}.${file.subtype}`

    await file.move(path, {
      name: filename
    })

    return file
  }
/**
  * Move um Multiplos arquivo para o caminho especificado se nenhum
  * for especificado entao 'public/uploads' sera utilizado
  */

 const manage_multiplos_uploads = async(fileJar,path = null) => {
  path = path ? path : Helpers.publicPath('uploads')
  let successes = [] ,
  errors = []

  await Promise.all(fileJar.files.map(async file => {
    let random_name = await str_random(30)
    let filename = `${new Date().getTime()}-${random_name}.${file.subtype}`
    await file.move(patch,{
      name : filename
    })
    if(file.moved()){
      successes.push(file)
    }else {
      errors.push(file.error())
    }
  }))
  return {successes, errors}
 }
 module.exports = {
   str_random
 }
