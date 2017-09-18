'use strict'

const path = require('path')
const nconf = require('nconf')

nconf
  .env()
  .file('conf', { file: 'env.json', dir: path.join(__dirname, '../etc/conf'), search: true })
  .defaults({
    'PORT': 8000,
    'REDIS_URL': 'redis',
    'API_URI': 'https://data.usajobs.gov/api/search',
    'API_HOST': 'data.usajobs.gov',
    'API_UA': 'my@email.com',
    'API_KEY': 'ar///huZ8jYHmO731jJBT9K//92bUUHBn3Q4KVi6VxM='
  })

module.exports = nconf
