import React, {Component} from 'react'

import * as d3 from 'd3'
import { max, min } from 'd3-array'
import { scaleLinear } from 'd3-scale'

import {withFauxDOM} from 'react-faux-dom'

import {getData} from '../apis/climate'

class DisplayTemp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tempRecords: {},
    }

    this.grabData = this.grabData.bind(this)
    this.createTempChart = this.createTempChart.bind(this)
  }

  componentDidMount() {
    this.grabData()
  }

  componentDidUpdate() {
    // console.log(this.state.tempRecords);
    this.createTempChart()
  }

  createTempChart() {
    const faux = this.props.connectFauxDOM('svg', 'tempChart')

    const size = [800, 600]

    const svg = d3.select(faux)
      .attr('width', size[0])
      .attr('height', size[1])

    const pureData = this.state.tempRecords.map(e => e.annualData[0])
    console.log(pureData);

    const yDomain = [0, max(pureData)]
    const xDomain = [1980, 1999]

    const yScale = scaleLinear()
       .domain(yDomain)
       .range([0, size[1]])

     const xScale = scaleLinear()
        .domain(xDomain)
        .range([0, size[0]])

    svg.selectAll('circle')
      .data(pureData)
      .enter()
        .append('circle')

    // svg.selectAll('circle')
    //   .data(pureData)
    //   .exit()
    //   .remove()

    svg.selectAll('circle')
      .data(pureData)
      .style('fill', 'red')
      .attr('cx', (d,i) => xScale(i + 1980))
      .attr('cy', d => size[1] - yScale(d))
      .attr('r', 0)

    this.props.animateFauxDOM(800)
  }

  grabData() {
    return getData('annualavg', 'tas', '1980', '1999', 'NZL')
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
          {this.props.tempChart}
        </ul>
      </div>
    )
  }
}

DisplayTemp.defaultProps = {
  tempChart: 'loading'
}

export default withFauxDOM(DisplayTemp)
