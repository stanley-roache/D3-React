import request from 'superagent'

function getTotalByCountryFromXUntilY(country, startYear, endYear) {
  return request.get(`/population/total/${country}/${startYear}/${endYear}`)
    .then(res => {
      console.log('recieved data', res.body[0]);
      return res.body
    })
}

function getCountryList() {
  return request.get('/population/countries')
    .then(res => {
      return res.body
    })
}

module.exports = {
  getTotalByCountryFromXUntilY,
  getCountryList
}
