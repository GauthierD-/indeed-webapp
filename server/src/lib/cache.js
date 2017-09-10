'use strict'

const Promise = require('bluebird')
const redis = require('ioredis')

const databases = {
  redis: null
}

const redisConnect = Promise.method((connectionUrl) => {
  if (!connectionUrl) {
    throw new Error('connectionUrl is missing')
  }
  databases.redis = redis(connectionUrl)
  return databases.redis
})

const setCache = Promise.method((hash, field, data) => {
  if (!hash) {
    throw new Error('Hash is missing')
  }

  if (!field) {
    throw new Error('Field is missing')
  }

  const redisClient = databases.redis

  if (!redisClient) {
    throw new Error('RedisClient is missing')
  }

  return redisClient.hset(hash, field, data)
})

const getCache = Promise.method((hash) => {
  if (!hash) {
    throw new Error('Hash is missing')
  }

  const redisClient = databases.redis

  if (!redisClient) {
    throw new Error('RedisClient is missing')
  }

  return redisClient.hgetall(hash)
})

module.exports = {
  redisConnect,
  databases,
  setCache,
  getCache
}
