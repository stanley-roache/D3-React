import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import PlainFauxBarChart from './PlainFauxBarChart'
import AnimatableComponent from './AnimatableComponent'
import AnimatedFauxBarChart from './AnimatedFauxBarChart'

const App = () => {
  let data = Array(22).fill(0).map(e => Math.random()*20),
      size = [500, 500]

  return (
    <Router>
      <div className='app-container section'>
        <h1>Dashboard</h1>
        <h2>Test Component</h2>
        <AnimatableComponent />
        <h2>plain faux render</h2>
        <PlainFauxBarChart data={data} size={size} />
        <h2>With connection to faux dom</h2>
        <AnimatedFauxBarChart data={data} size={size} />
      </div>
    </Router>
  )
}

export default App
