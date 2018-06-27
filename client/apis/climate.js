import request from 'superagent'

function getData(type, metric, start, end, country) {
  return request.get('/climate/getData')
    .query({start, end, country, metric, type})
    .send()
    .then(res => {
      console.log(`successful fetch to client api`);
      return res
    })
}

module.exports = {
  getData
}
