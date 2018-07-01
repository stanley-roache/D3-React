import React from 'react'

export default class SelectCountryForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      country: 'New Zealand',
      start: 1950,
      end: 2018
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    this.props.handler(this.state)
    e.preventDefault()
  }

  render () {
    return (
      <div className='select-country'>
        <form onSubmit={this.handleSubmit}>
          <label>
          Select Country:
          <select name='country' value={this.state.country} onChange={this.handleChange}>
            {this.props.countryList.map(country => (
              <option value={country}>{country}</option>
            ))}
          </select>
          </label>

          <label>
          From:
          <input type='text' name='start' value={this.state.start} onChange={this.handleChange} />
          </label>

          <label>
          Until:
          <input type='text' name='end' value={this.state.end} onChange={this.handleChange} />
          </label>

          <input type="submit" value="See Graph" />
        </form>
      </div>
    )
  }
}
