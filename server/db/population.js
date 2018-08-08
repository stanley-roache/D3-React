const db = require('./connection')

function getAvailableDataForCountry (name) {
  return db('population')
    .where({name})
}

function injectData (parcel) {
  return checkExists(parcel.name)
    .then(exists => {
      return (exists)
      ? updateCountryData(parcel)
      : insertCountryData(parcel)
    })
}

function updateCountryData (parcel) {
  return db('population')
    .where({name: parcel.name})
    .update(parcel.years)
}

function insertCountryData (parcel) {
  return db('population')
    .insert({
      name: parcel.name,
      ...parcel.years
    })
}

function checkExists (name) {
  return db('population')
    .where({name})
    .first()
    .then(result => !!result)
}

module.exports = {
  getAvailableDataForCountry,
  injectData
}
