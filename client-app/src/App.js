/* global fetch */
import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import JobsList from './JobsList'
import { isEmpty } from 'lodash'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      location: '',
      jobs: []
    }

    this.onChangeUser = this.onChangeUser.bind(this)
    this.onChangeLocation = this.onChangeLocation.bind(this)
    this.findJobs = this.findJobs.bind(this)
    this.findJobsByLocation = this.findJobsByLocation.bind(this)
    this.saveJob = this.saveJob.bind(this)
    this.deleteJob = this.deleteJob.bind(this)
  }

  onChangeUser (event) {
    this.setState({ username: event.target.value })
  }

  onChangeLocation (event) {
    this.setState({ location: event.target.value })
  }

  findJobs () {
    fetch(`http://localhost:3001/indeed/my/jobs/${this.state.username}`)
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        this.setState({ jobs: result.data.jobs })
      })
      .catch(console.error)
  }

  findJobsByLocation () {
    fetch(`http://localhost:3001/indeed/jobs/${this.state.location}`)
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        this.setState({ jobs: result.data.jobs })
      })
      .catch(console.error)
  }

  saveJob (job) {
    // need debounce
    if (isEmpty(this.state.username)) {
      window.alert('NEED USERNAME')
    } else {
      const payload = {
        user: this.state.username,
        job
      }
      fetch(`http://localhost:3001/indeed/job/save`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          return response.json()
        })
        .then((resp) => {
          if (resp.data && resp.data.save) {
            window.alert('Saved')
          }
        })
        .catch(console.error)
    }
  }

  deleteJob (job) {
    // need debounce
    if (isEmpty(this.state.username)) {
      window.alert('NEED USERNAME')
    } else {
      const jobIndex = this.state.jobs.findIndex((el) => el.name === job.name)
      // Latency compensation
      this.setState((state) => ({
        jobs: state.jobs.filter((_, i) => i !== jobIndex)
      }))

      const payload = {
        user: this.state.username,
        job
      }
      fetch(`http://localhost:3001/indeed/job`, {
        method: 'DELETE',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          return response.json()
        })
        .then((resp) => {
          if (resp.data && resp.data.delete) {
            window.alert('Deleted')
          }
          this.findJobs()
        })
        .catch(console.error)
    }
  }

  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to Indeed JobBoard</h2>
        </div>
        <p className='App-intro'>
          Enter your username to recover your saved jobs
        </p>
        <div>
          <input placeholder='username' value={this.state.username} onChange={this.onChangeUser} />
          <button onClick={this.findJobs}>Find my jobs</button>
        </div>

        <p className='App-intro'>
          Enter a Location (city,country)
        </p>
        <div>
          <input placeholder='city' value={this.state.location} onChange={this.onChangeLocation} />
          <button onClick={this.findJobsByLocation}>Find jobs</button>
        </div>

        <JobsList
          jobs={this.state.jobs}
          saveJob={this.saveJob}
          deleteJob={this.deleteJob}
        />

      </div>
    )
  }
}

export default App
