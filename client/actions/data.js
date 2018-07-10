import {getTotalByCountryFromXUntilY} from '../apis/population'

function receiveDataAction(data) {
    return {
        type: 'RECEIVED_DATA',
        data
    }
}

function requestDataAction() {
    return {
        type: 'REQUEST_DATA',
    }
}

export function fetchGraph(selection) {
  return dispatch => {
    dispatch(requestDataAction())
    const {country, start, end} = selection
    getTotalByCountryFromXUntilY(country, start, end)
      .then(data => {
        console.log('success fetching data', data[0]);
        dispatch(receiveDataAction(data))
      })
  }
}
