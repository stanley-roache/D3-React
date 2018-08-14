const request = require('superagent')
const router = require('express').Router()

const pop = require('../apis/population')
const popDB = require('../db/population')
const cacheManager = require('../util/cachemanager')

router.get('/total/:country/:start/:end/', (req, res) => {
  const { country, start, end } = req.params

  // check what is available in DB
  popDB.getAvailableDataForCountry(country)
    .then(data => {
      return (data)
        ? fetchAndInjectMissing(data, start, end)
        : fetchAndInjectAll(country, start, end)
    })

  pop.getTotalByCountryFromXUntilY(country, start, end)
    .then(data => { res.json(data) })
})

router.get('/detailed/:country/:start/:end/', (req, res) => {
  const { country, start, end } = req.params

  pop.getDetailedByCountryFromXUntilY(country, start, end)
    .then(data => { res.json(data) })
})

router.get('/countries', (req, res) => {
  pop.getCountryList()
    .then(list => {
      res.json(list)
    })
})

module.exports = router
