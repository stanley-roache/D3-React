const db = require('../db/population')
const api = require('../apis/population')

function fetchAndInjectAll(country, start, end) {
  return api.getTotalByCountryFromXUntilY(country, start, end)
    .then(data => {
        return db.injectData({
          name: country,
          years: data.map(item => ({
            [item.year]: item.population
          }))
        }).then(() => data)
    })
}

function fetchAndInjectMissing(data, start, end) {
  let totalData = {
    name: data.name,
    years: []
  }
  const availableYears = Object.keys(data).filter(key => {
    return typeof data[key] == 'number' && key != 'id'
  })
  availableYears.forEach(year => {
    totalData.years[year] = data[year]
  })

  const firstMissingYear = +availableYears[availableYears.length - 1]
  
  return (availableYears[availableYears.length - 1] == end)
    ? Promise.resolve(totalData)
    : api.getTotalByCountryFromXUntilY(data.name, start, end)
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