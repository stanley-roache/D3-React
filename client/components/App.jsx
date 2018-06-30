import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import DisplayTemp from './DisplayTemp'
import PopulationGraph from './PopulationGraph'

import {CO2} from '../../server/data/co2'

const App = () => {
  let mockData = [
    {year: 1950, population: 10},
    {year: 1951, population: 80},
    {year: 1952, population: 120},
    {year: 1953, population: 200},
    {year: 1954, population: 100}
  ]
  let size = [500, 500]

  return (
    <Router>
      <div className='app-container section'>
        <h1>Dashboard</h1>
        <h2>Test Component</h2>
        <PopulationGraph data={mockData}/>
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
