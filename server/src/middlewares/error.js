'use strict'

module.exports = (err, req, res, next) => {
  console.log('ERRROROROR ===>', err)
  const statusCode = err.status || err.statusCode || 500

  const body = {
    message: err.message
  }

  if (statusCode === 500) {
    body.stack = err.stack
  } else {
    body.type = err.name
  }

  if (err.errors) {
    body.errors = err.errors
  }

  console.error('Route Error ====>', body)

  res.status(statusCode).json(body)
}
