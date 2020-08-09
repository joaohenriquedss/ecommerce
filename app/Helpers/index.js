'use stric'

const crypto = use('crypto')
const Helpers = use('Helpers')

/**
 * Generate random string
 * @param {int} length - Tamanho da string
 * @return {string} - string randomica
 */

 const str_random = async(length = 40) => {
   let string = ''
   let len = string.length

   if(len < length) {
     let size = length - len
     let bytes = await crypto.ranfomBytes(size)
     let buffer = new Buffer(bytes)
     string += buffer
     .toString('base64')
     .replace(/[a-zA-Z0-0]/g,'')
     .substr(0,size)
   }
   return string
 }

 module.exports = {
   str_random
 }
