import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import PlainFauxBarChart from './PlainFauxBarChart'
import AnimatableComponent from './AnimatableComponent'
import AnimatedFauxBarChart from './AnimatedFauxBarChart'
import DisplayTemp from './DisplayTemp'

import {CO2} from '../../server/data/co2'

const App = () => {
  let size = [500, 500]

  return (
    <Router>
      <div className='app-container section'>
        <h1>Dashboard</h1>
        <h2>Test Component</h2>
        <DisplayTemp />
      </div>
    </Router>
  )
}

export default App


{/*
  <AnimatableComponent />
  <h2>plain faux render</h2>
  <PlainFauxBarChart data={CO2} size={size} />
  <h2>With connection to faux dom</h2>
  <AnimatedFauxBarChart data={CO2} size={size} />

  */}
