import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import {withFauxDOM} from 'react-faux-dom'


class AnimatedFauxBarChart extends Component {
   constructor(props){
      super(props)

      this.createBarChart = this.createBarChart.bind(this)
   }

   componentDidMount(props) {
     const faux = this.props.connectFauxDOM('svg', 'chart')

     this.createBarChart(faux)

     this.props.animateFauxDOM(800)
   }

   createBarChart(faux) {
      const ppm = this.props.data.map(e => e.ppm)
      const dataMax = max(ppm)
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[1]])

     select(faux)
        .attr('width', 800)
        .attr('height', 800)
        .selectAll('rect')
        .data(ppm)
        .enter()
        .append('rect')

     select(faux)
        .selectAll('rect')
        .data(ppm)
        .exit()
        .remove()

     select(faux)
        .selectAll('rect')
        .data(ppm)
        .style('fill', '#fe9922')
        .attr('x', (d,i) => i * 15)
        .attr('y', d => this.props.size[1] - yScale(d))
        .attr('height', d => yScale(d))
        .attr('width', 15)
   }

  render() {
    return <div>{this.props.chart}</div>
  }
}

AnimatedFauxBarChart.defaultProps = {
  chart: 'loading'
}

export default withFauxDOM(AnimatedFauxBarChart)
