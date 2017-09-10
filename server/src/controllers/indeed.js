'use strict'

// const request = require('request-promise')
const express = require('express')
const router = express.Router()

const { setCache, getCache } = require('../lib/cache')

router.get('/jobs/:location', (req, res, next) => {
  const location = req.params && req.params.location
  console.log('location ==', location)
  // Wait for indeed API KEY
  // request({
  //   uri: 'api-indeed',
  //   method: 'GET',
  //   qs: {
  //     location
  //   },
  //   headers: {
  //     'publish-id': '__id__'
  //   },
  //   json: true // Automatically parses the JSON string in the response
  // })
  //   .then((result) => {
  //     // sort by date
  //     res.json({ data: { jobs: result } })
  //   })
  //   .catch(next)

  res.json({ data: { jobs: [] } })
})

router.post('/job/save', (req, res, next) => {
  const user = req.body && req.body.user
  const job = req.body && req.body.job
  setCache(`job:${user}`, job.title, JSON.stringify(job))
    .then(() => {
      res.status(201).json({ data: { save: true } })
    })
    .catch(next)
})

router.get('/my/jobs/:user', (req, res, next) => {
  const user = req.params && req.params.user
  getCache(`job:${user}`)
    .then((jobs) => {
      const myJobs = Object.keys(jobs)
        .map((el) => {
          const job = JSON.parse(jobs[el])
          job.date = new Date(job.date)
          return job
        })
        .sort((a, b) => b.date - a.date)

      res.status(201).json({ data: { jobs: myJobs } })
    })
    .catch(next)
})

router.get('/', (req, res, next) => {
  next(new Error('City is missing'))
})

module.exports = router
