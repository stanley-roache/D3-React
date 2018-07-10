import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import {getTotalByCountryFromXUntilY, getCountryList} from '../apis/population'

import PopulationGraph from './PopulationGraph'
import GlobeSelector from './GlobeSelector'
import DisplayTemp from './DisplayTemp'

import store from '../store'

import {CO2} from '../../server/data/co2'

import {connect} from 'react-redux'

import {updateDataAction} from '../actions/data'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      countryList: []
    }
  }

  componentDidMount() {
    getCountryList()
      .then(results => {
        this.setState({
          countryList: results.countries
        })
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.country != this.props.country) this.fetchGraph({
      country: this.props.country,
      start: 1950,
      end: 2018
    })
  }

  fetchGraph(selection) {
    const {country, start, end} = selection
    getTotalByCountryFromXUntilY(country, start, end)
      .then(data => {
        console.log('success fetching data', data[0]);
        this.props.dispatch(updateDataAction(data))
      })
  }
  // <DisplayTemp />

  render() {
    return (
        <div className='app-container section'>
          <GlobeSelector />
          {(this.props.data.length == 0)
            ? <h1>No data to show</h1>
            : <PopulationGraph />}
        </div>

    )
  }
}

function mapStateToProps({country, data}) {
  return {
    country,
    data
  }
}

export default connect(mapStateToProps)(App)
