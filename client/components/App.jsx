import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import PlainFauxBarChart from './PlainFauxBarChart'
import AnimatableComponent from './AnimatableComponent'

const App = () => {
  let data = Array(22).fill(0).map(e => Math.random()*20),
      size = [500, 500]

  return (
    <Router>
      <div className='app-container section'>
        <h1>Dashboard</h1>
        <PlainFauxBarChart data={data} size={size} />
      </div>
    </Router>
  )
}
{/*<BarChart data={data} size={size} />*/}

export default App
