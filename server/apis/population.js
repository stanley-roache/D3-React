const request = require('superagent')

const apiURL = 'http://api.population.io:80/1.0/population'

function getPopulationByCountryInYear(country, year, callback) {
  console.log(`Server side api fetching population data for ${country} in ${year}`);
  return request.get(`${apiURL}/${year}/${country}/`)
    .set('Content-Type', 'application/json')
    .then(res => {
      console.log('succes fetching data');
      if (callback) callback(res.body)
      return res.body
    })
    .catch(err => {
      console.log('logging error', err);
    })
}

function getPopulationByCountryFromXUntilY(country, startString, endString) {
  const start = Number(startString)
  const end = Number(endString)

  if (end <= start) throw new Error('bad request, end before start');
  if (end > 2100 || start < 1950) throw new Error('outside year range')

  const years = Array(end - start).fill(0)
                                      .map((el, i) => start + i)

  const data = {}

  return Promise.all(
    years.map(year => (
      getPopulationByCountryInYear(country, year, results => { addYearToData(year, results, data) }))
    )
  ).then(() => {
    return data
  })

  function addYearToData(year, results, data) {
    data[year] = results
  }
}

function getWorldPopulationRecordUpTo(year) {
  return getPopulationByCountryFromXUntilY('World', 1950, year)
}

// getWorldPopulationRecordUpTo(2000)
//   .then(results => {
//     console.log(`There are ${Object.keys(results).length} years in the result object`);
//   })


module.exports = {
  getPopulationByCountryInYear,
  getWorldPopulationRecordUpTo,
  getPopulationByCountryFromXUntilY
}
