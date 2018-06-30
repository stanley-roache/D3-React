const request = require('superagent')
const router = require('express').Router()

const climate = require('../apis/climate')

router.get('/getData', (req, res) => {
  console.log(`Router active, seeking data`);
  const {start, end, country, metric, type} = req.query
  climate.getData(type, metric, start, end, country)
    .then(data => {
      console.log(`Success, returning data`);
      res.json(data)
    })
})

module.exports = router
