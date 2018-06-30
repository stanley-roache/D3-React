const request = require('superagent')
const router = require('express').Router()

const pop = require('../apis/population')

router.get('/total/:country/:start/:end/', (req, res) => {
  console.log(`Population Router active, seeking data`);

  const {country, start, end} = req.params

  pop.getTotalByCountryFromXUntilY(country, start, end)
    .then(data => {
      console.log(`population router Success, returning data`);
      res.json(data)
    })
})

router.get('/detailed/:country/:start/:end/', (req, res) => {
  console.log(`Population Router active, seeking data`);

  const {country, start, end} = req.params

  pop.getDetailedByCountryFromXUntilY(country, start, end)
    .then(data => {
      console.log(`population router Success, returning data`);
      res.json(data)
    })
})

router.get('/countries', (req, res) => {
  pop.getCountryList()
    .then(list => {
      res.json(list)
    })
})

module.exports = router
