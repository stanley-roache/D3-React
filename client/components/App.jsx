import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import {getTotalByCountryFromXUntilY, getCountryList} from '../apis/population'

import PopulationGraph from './PopulationGraph'
import GlobeSelector from './GlobeSelector'
import DisplayTemp from './DisplayTemp'
import CountrySelect from './CountrySelect'

import store from '../store'

import {connect} from 'react-redux'

import {fetchGraph} from '../actions/data'
import {fetchJSONCountryList} from '../actions/countryList'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchJSONCountryList())
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.country != this.props.country) this.props.dispatch(
      fetchGraph({
        country: this.props.country,
        start: 1950,
        end: 2018
      })
    )
  }

  render() {
    return (
        <div className='app-container section'>
          {this.props.fetchStatus.countries === 'received' &&
            <CountrySelect />}
          {this.props.fetchStatus.countries === 'received' &&
            <GlobeSelector />}
          {(this.props.data.length == 0)
            ? <h1>No data to show</h1>
            : <PopulationGraph />}
        </div>

    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(App)
