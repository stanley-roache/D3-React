import {combineReducers} from 'redux'

import country from './country'
import data from './data'
import fetchStatus from './fetchStatus'

export default combineReducers({
  country,
  data,
  fetchStatus
})
