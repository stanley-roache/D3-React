function prepareForDB (parcel) {
  const data = {
    name: parcel.name
  }
  parcel.years.forEach(item => {
    data[item.year + ''] = item.population
  })
  return data
}

function parseFromDB (raw) {
  const parcel = {
    name: raw.name,
    years: []
  }

  delete raw.id 
  delete raw.name

  Object.keys(raw).forEach(year => {
    parcel.years.push({
      year: Number(year),
      population: raw[year]
    })
  })

  return parcel
}

module.exports = {
  prepareForDB,
  parseFromDB
}