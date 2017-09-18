'use strict'

const request = require('request-promise')
const moment = require('moment')
const express = require('express')
const router = express.Router()

const settings = require('../../config')
const { setCache, getCache, deleteCache } = require('../lib/cache')

router.get('/jobs/:location', (req, res, next) => {
  const location = req.params && req.params.location

  return request({
    url: `${settings.get('API_URI')}?LocationName=${location}`,
    method: 'GET',
    headers: {
      'Host': settings.get('API_HOST'),
      'User-Agent': settings.get('API_UA'),
      'Authorization-Key': settings.get('API_KEY')
    },
    json: true
  })
    .then((resp) => {
      // sort by date
      let result = []
      if (resp.SearchResult) {
        result = resp.SearchResult.SearchResultItems.map((el) => {
          return {
            name: el.MatchedObjectDescriptor.PositionTitle,
            date: moment(el.MatchedObjectDescriptor.PublicationStartDate),
            description: el.MatchedObjectDescriptor.QualificationSummary.slice(0, 140),
            salary: el.MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange,
            salaryInterval: el.MatchedObjectDescriptor.PositionRemuneration[0].RateIntervalCode
          }
        })
          .sort((a, b) => b.date - a.date)
      }
      res.json({ data: { jobs: result } })
    })
    .catch(next)
})

router.post('/job/save', (req, res, next) => {
  const user = req.body && req.body.user
  const job = req.body && req.body.job

  if (!job || !job.name) {
    return res.status(400).json({ data: { save: false } })
  } else {
    const jobSaved = Object.assign({}, job, { isSaved: true })
    setCache(`job:${user}`, job.name, JSON.stringify(jobSaved))
      .then(() => {
        res.status(201).json({ data: { save: true } })
      })
      .catch(next)
  }
})

router.delete('/job', (req, res, next) => {
  const user = req.body && req.body.user
  const job = req.body && req.body.job

  if (!job || !job.name) {
    return res.status(400).json({ data: { delete: false } })
  } else {
    deleteCache(`job:${user}`, job.name)
      .then(() => {
        res.status(201).json({ data: { delete: true } })
      })
      .catch(next)
  }
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
