import React, {Component} from 'react'

import {getData} from '../apis/climate'

class DisplayTemp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tempRecords: {}
    }

    this.grabData = this.grabData.bind(this)
  }

  componentDidMount() {
    this.grabData()
  }

  grabData() {
    getData('mavg', 'tas', '1980', '1999', 'NZL')
      .then(res => {
        let tempRecords = JSON.parse(res.body.text)
        console.log(`json parsed response: `, tempRecords);
        this.setState({
          tempRecords
        })
      })
  }

  render() {
    return (
      <div className="temp-container">
      <ul>
        {this.state.tempRecords.length && this.state.tempRecords.map(entry => (
          <li>{this.state.tempRecords[entry]}</li>
        ))}
      </ul>
      </div>
    )
  }
}

export default DisplayTemp
