import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import {getTotalByCountryFromXUntilY, getCountryList} from '../apis/population'

import DisplayTemp from './DisplayTemp'
import SelectCountryForm from './SelectCountryForm'
import PopulationGraph from './PopulationGraph'

import {CO2} from '../../server/data/co2'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      countryList: []
    }
  }

  componentDidMount() {
    console.log('fetching country list');
    getCountryList()
      .then(results => {
        console.log('fetched country list', results[0]);
        this.setState({
          countryList: results.countries
        })
      })
  }

  fetchGraph(selection) {
    const {country, start, end} = selection
    getTotalByCountryFromXUntilY(country, start, end)
      .then(data => {
        console.log('success fetching data', data[0]);
        this.setState({data})
      })
  }

  render() {
    console.log('rerender with ', this.state.data);
    return (
      <Router>
      <div className='app-container section'>
      <h1>Dashboard</h1>
      {(this.state.countryList.length)
          ? <SelectCountryForm countryList={this.state.countryList} handler={selection => this.fetchGraph(selection)}/>
          : <p> Fetching Country List... </p>
      }
      {this.state.data.length
          && <PopulationGraph data={this.state.data} />}
      </div>
      </Router>
    )
  }
}

export default App
