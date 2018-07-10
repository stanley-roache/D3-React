import {combineReducers} from 'redux'

import country from './country'
import data from './data'
import fetchStatus from './fetchStatus'
import countryList from './countryList'

export default combineReducers({
  country,
  countryList,
  data,
  fetchStatus
})
