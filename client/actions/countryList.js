import {getCountryList} from '../apis/population'
import {tsv} from 'd3'

function requestCountryListAction() {
  return {
    type: 'REQUEST_COUNTRIES'
  }
}

function receiveCountryListAction(data) {
  return {
    type: 'RECEIVED_COUNTRIES',
    data
  }
}

export function fetchJSONCountryList() {
  return dispatch => {
    dispatch(requestCountryListAction())

    tsv('/world-110m-country-names.tsv')
      .then(countryData => {
        dispatch(receiveCountryListAction(countryData))
      })
  }
}

export function fetchAPICountryList() {
  return dispatch => {
    dispatch(requestCountryListAction())
    getCountryList()
      .then(results => {
        dispatch(receiveCountryListAction(results.countries))
      })
  }
}
