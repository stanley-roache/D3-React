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
  const availableYears = Object.keys(data).filter(key => {
    return typeof data[key] == 'number' && key != 'id'
  }).sort((a,b) => Number(a) - Number(b))

  availableYears.forEach(year => {
    totalData.years[year] = data[year]
  })

  const firstLaterYear = Number(availableYears[availableYears.length - 1]) + 1
  const lastPriorYear = Number(availableYears[0]) - 1
  
  let addingData = Promise.resolve(totalData)

  if (firstLaterYear <= Number(end)) {
    addingData = addingData.then(() => {
      return api.getTotalByCountryFromXUntilY(data.name, firstLaterYear, end)
        .then(newData => {
          const laterYears = newData.map(item => ({
            [item.year]: item.population
          }))
          laterYears.forEach(year => {
            totalData.years.push(year)
          })
          return db.injectData({
            name: data.name,
            years: laterYears
          })
        })
    })
  }

  if (lastPriorYear >= Number(start)) {
    addingData = addingData.then(() => {
      return api.getTotalByCountryFromXUntilY(data.name, start, lastPriorYear)
        .then(newData => {
          const priorYears = newData.map(item => ({
            [item.year]: item.population
          }))
          priorYears.forEach(year => {
            totalData.years.push(year)
          })
          return db.injectData({
            name: data.name,
            years: priorYears
          })
        })
    })
  }

  return addingData.then(() => {
    totalData.years = totalData.years.filter(item => {
      const year = Object.keys(item)[0]
      return Number(year) <= Number(end) && Number(year) >= Number(start)
    })
    return totalData
  })
}

module.exports = {
  fetchAndInjectAll,
  fetchAndInjectMissing
}