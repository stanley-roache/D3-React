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
  const country = data.name
  const availableData = {
    name: country,
    years: []
  }
  const availableYears = Object.keys(data).filter(key => {
    return typeof data[key] == 'number' && key != 'id'
  })
  availableYears.forEach(year => {
    availableData.years[year] = data[year]
  })

  const firstLaterYear = Number(availableYears[availableYears.length - 1]) + 1
  const lastPriorYear = Number(availableYears[0]) - 1
  let results = Promise.resolve(availableData)

  if (firstLaterYear <= Number(end)) {
    results = results.then(accumulator => {
      api.getTotalByCountryFromXUntilY(data.name, firstLaterYear, end)
        .then(newData => {
          const newYears = newData.map(item => ({
            [item.year]: item.population
          }))
          newYears.forEach(year => {
            accumulator.years.push(year)
          })
          return db.injectData({
            name: country,
            years: newYears
          }).then(() => accumulator)
        })
    })
  }

  if (lastPriorYear >= Number(start)) {
    results = results.then(accumulator => {
      api.getTotalByCountryFromXUntilY(data.name, start, lastPriorYear)
        .then(newData => {
          const newYears = newData.map(item => ({
            [item.year]: item.population
          }))
          newYears.forEach(year => {
            accumulator.years.push(year)
          })
          return db.injectData({
            name: country,
            years: newYears
          }).then(() => accumulator)
        })
    })
  }

  return accumulator
}

module.exports = {
  fetchAndInjectAll,
  fetchAndInjectMissing
}