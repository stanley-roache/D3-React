import request from 'superagent'

function getTotalByCountryFromXUntilY(country, startYear, endYear) {
  return request.get(`/population/total/${country}/${startYear}/${endYear}`)
    .then(res => res.body)
}

function getCountryList() {
  return request.get('/population/countries')
    .then(res => res.body)
}

module.exports = {
  getTotalByCountryFromXUntilY,
  getCountryList
}
