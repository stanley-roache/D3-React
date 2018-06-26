import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import ReactFauxDOM from 'react-faux-dom'


class PlainFauxBarChart extends Component {
   constructor(props){
      super(props)

      this.createBarChart = this.createBarChart.bind(this)
   }

   createBarChart() {
      const svg = new ReactFauxDOM.createElement('svg')

      const dataMax = max(this.props.data)
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[1]])

     select(svg)
        .selectAll('rect')
        .data(this.props.data)
        .enter()
        .append('rect')

     select(svg)
        .selectAll('rect')
        .data(this.props.data)
        .exit()
        .remove()

     select(svg)
        .selectAll('rect')
        .data(this.props.data)
        .style('fill', '#fe9922')
        .attr('x', (d,i) => i * 25)
        .attr('y', d => this.props.size[1] - yScale(d))
        .attr('height', d => yScale(d))
        .attr('width', 25)

      return svg.toReact()
   }

  render() {
      return this.createBarChart()
   }
}
export default PlainFauxBarChart
