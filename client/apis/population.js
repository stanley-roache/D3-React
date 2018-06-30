import request from 'superagent'

function getTotalByCountryFromXUntilY(country, startYear, endYear) {
  return request.get(`/population/total/${country}/${startYear}/${endYear}`)
    .then(res => {
      return res.body
    })
}

module.exports = {
  getTotalByCountryFromXUntilY
}
