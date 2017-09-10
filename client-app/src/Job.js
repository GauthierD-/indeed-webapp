import React from 'react'
import './job.css'

function Job ({ infos }) {
  console.log('infoss=', infos)
  return (
    <div className='job_box'>
      <h2>{infos.title}</h2>
      <p>Date: {new Date(infos.date).toUTCString()} - Salary {infos.salary}</p>
      <p>{infos.description}</p>
    </div>
  )
}

export default Job
