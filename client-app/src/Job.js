import React from 'react'
import './job.css'

function Job ({ infos, saveJob, deleteJob }) {
  const style = {
    backgroundColor: 'aliceblue'
  }

  if (infos.isSaved) {
    style.backgroundColor = '#00ffc4'
  }

  return (
    <div className='job_box' style={style}>
      <h2>{infos.name}</h2>
      <p>Date: {new Date(infos.date).toUTCString()} - Salary {infos.salaryInterval} - {infos.salary} </p>
      <p>{infos.description}</p>
      {
        infos.isSaved
          ? <button onClick={() => deleteJob(infos)}>Delete</button>
          : <button onClick={() => saveJob(infos)}>Save</button>
      }
    </div>
  )
}

export default Job
