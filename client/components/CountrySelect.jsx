import React from 'react'
import {connect} from 'react-redux'

import Select from 'react-select'

import {selectCountryAction} from '../actions/country'

const CountrySelect = props => (
  <Select
    value={props.country}
    onChange={props.onChangeCountry}
    options={props.countryList.map(country => (
      { 
        value: country.id, 
        name: country.name
      }
    ))}
  />
)

const mapStateToProps = ({countryList, country}) => ({countryList, country})

const mapDispatchToProps = dispatch => ({
  onChangeCountry: selected => dispatch(selectCountryAction(selected.name))
})

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelect)
