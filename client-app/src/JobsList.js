import React from 'react'
import Job from './Job'

function JobsList ({ jobs, saveJob, deleteJob }) {
  if (jobs.length === 0) {
    return (
      <p>Empty jobs</p>
    )
  }

  return (
    <div>
      {jobs.map((el, i) => (
        <Job key={i} infos={el} saveJob={saveJob} deleteJob={deleteJob} />
      ))}
    </div>
  )
}

JobsList.defaultProps = {
  jobs: []
}

export default JobsList
