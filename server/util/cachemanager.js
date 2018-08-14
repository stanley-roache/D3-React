const db = require('../db/population')
const api = require('../apis/population')

function fetchAndInjectAll(country, start, end) {
  return pop.getTotalByCountryFromXUntilY(country, start, end)
    .then(data => {
        return db.injectData({
          name: country,
          years: data.map(item => ({
            [item.year]: item.population
          }))
        }).then(() => data)
    })
}

module.exports = {
  fetchAndInjectAll,
  fetchAndInjectMissing
}