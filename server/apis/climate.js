const request = require('superagent')

const climateURL = 'http://climatedataapi.worldbank.org/climateweb/rest/v1/country'

function getData(type, metric, start, end, country) {
  console.log(`Sending request to remote api`);
  return request.get(`${climateURL}/${type}/${metric}/${start}/${end}/${country}.json`)
}

module.exports = {
  getData
}
