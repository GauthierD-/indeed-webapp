'use strict'

const path = require('path')
const nconf = require('nconf')

nconf
  .env()
  .file('conf', { file: 'env.json', dir: path.join(__dirname, '../etc/conf'), search: true })
  .defaults({
    'PORT': 8000,
    'REDIS_URL': 'redis'
  })

module.exports = nconf
