'use strict'

const Promise = require('bluebird')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const settings = require('../config')
const { redisConnect } = require('./lib/cache')
const errorHandler = require('./middlewares/error')
const indeedRouter = require('./controllers/indeed')

const connect = {
  REDIS: redisConnect(settings.get('REDIS_URL'))
}

Promise.props(connect)
  .then((con) => {
    const port = settings.get('PORT')
    const app = express()

    app.use(cors({ maxAge: 10 * 60 }))
    app.use(bodyParser.json())
    app.use(bodyParser.text())
    app.use(bodyParser.urlencoded({ extended: false }))

    app.use('/health', (req, res) => {
      res.json({ ok: 1 })
    })

    app.use('/indeed', indeedRouter)

    app.use((req, res) => {
      res.status(404).end('Not Found')
    })

    app.use(errorHandler)

    app.listen(port, () => {
      console.log(`Indeed app started on port ${port}`)
    })
  })
  .catch((err) => {
    gracefullExit(err)
  })

process.on('exit', gracefullExit)
process.on('SIGINT', gracefullExit)

function gracefullExit (err) {
  if (err) {
    console.error('[ERROR] ', err)
  }
  process.exit(0)
}
