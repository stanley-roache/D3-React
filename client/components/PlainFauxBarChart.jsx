import React, { Component } from 'react'
import ReactFauxDOM from 'react-faux-dom'

import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'


class PlainFauxBarChart extends Component {
   constructor(props){
      super(props)

      this.createBarChart = this.createBarChart.bind(this)
   }

   createBarChart() {
      const svg = new ReactFauxDOM.createElement('svg')
      const ppm = this.props.data.map(e => e.ppm)

      const dataMax = max(ppm)
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[1]])

     select(svg)
       .attr('width', 800)
       .attr('height', 800)
        .selectAll('rect')
        .data(ppm)
        .enter()
          .append('rect')

     select(svg)
        .selectAll('rect')
        .data(ppm)
        .exit()
        .remove()

     select(svg)
        .selectAll('rect')
        .data(ppm)
        .style('fill', '#fe9922')
        .attr('x', (d,i) => i * 15)
        .attr('y', d => this.props.size[1] - yScale(d))
        .attr('height', d => yScale(d))
        .attr('width', 15)

      return svg.toReact()
   }

  render() {
      return this.createBarChart()
   }
}
export default PlainFauxBarChart
