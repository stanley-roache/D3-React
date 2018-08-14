const db = require('../db/population')
const api = require('../apis/population')

function fetchAndInjectAll (country, start, end) {
  return pop.getTotalByCountryFromXUntilY(country, start, end)
    .then(data => {
      db.injectData({
        name: country,
        years: data
      })
    })
}

module.exports = {
  fetchAndInjectAll,
  fetchAndInjectMissing
}