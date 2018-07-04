import React, {Component} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import {getTotalByCountryFromXUntilY, getCountryList} from '../apis/population'

import DisplayTemp from './DisplayTemp'
import SelectCountryForm from './SelectCountryForm'
import PopulationGraph from './PopulationGraph'
import GlobeSelector from './GlobeSelector'

import {CO2} from '../../server/data/co2'

import {connect} from 'react-redux'

import {updateDataAction} from '../actions/data'

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
        this.setState({data})
        this.props.dispatch(updateDataAction(data))
      })
    }
    
    render() {
      return (
        <Router>
        <div className='app-container section'>
          <h1>Dashboard</h1>
        <GlobeSelector />
        {(this.state.countryList.length)
            ? <SelectCountryForm countryList={this.state.countryList} handler={selection => this.fetchGraph(selection)}/>
            : <p> Fetching Country List... </p>
          }
        {this.state.data.length
            && <PopulationGraph />}
        </div>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  return {
    country: state.country
  }
}

export default connect(mapStateToProps)(App)
