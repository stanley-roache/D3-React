import React, {Component} from 'react'
import {withFauxDOM} from 'react-faux-dom'

import * as d3 from 'd3'
import { max, min } from 'd3-array'
import { scaleLinear } from 'd3-scale'

class PopulationGraph extends Component {
    constructor(props) {
      super(props)

      this.animateChart = this.animateChart.bind(this)
    }

    componentDidMount() {
      this.animateChart()
    }

    animateChart() {
      console.log('connecting faux dom');
      const faux = this.props.connectFauxDOM('svg', 'chart')

      var margin = { top: 20, right: 20, bottom: 30, left: 80 };

      const svgSize = [800, 600]
      const size = [svgSize[0] - margin.left - margin.right, svgSize[1] - margin.top - margin.bottom]

      const svg = d3.select(faux)
        .attr('width', svgSize[0])
        .attr('height', svgSize[1])

      const data = this.props.data
            data.map(e => {e.year = new Date(e.year, 1)})

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      const xScale = d3.scaleTime().rangeRound([0, size[0]])

      const yScale = d3.scaleLinear().rangeRound([size[1], 0])

      const line = d3.line()
        .curve(d3.curveMonotoneX)
        // .interpolate('cardinal')
        .x(d => xScale(d.year))
        .y(d => yScale(d.population))

      xScale.domain(d3.extent(data, d => d.year))
      yScale.domain(d3.extent(data, d => d.population))

      console.log(d3.extent(data, d => d.year));

      g.append('g')
        .attr('transform', `translate(0,${size[1]})`)
        .call(d3.axisBottom(xScale))
        // .select('.domain')
        // .remove();

      g.append('g')
        .call(d3.axisLeft(yScale))
        .append('text')
        .attr('fill', '#000')
        .attr("transform", "rotate(-90)")
       .attr("y", 6)
       .attr("dy", "0.71em")
       .attr("text-anchor", "end")
       .text("Population");

       g.append("path")
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);


      this.props.animateFauxDOM(20)

    }

    render() {
      return (
        <div className="container">
          {this.props.chart}
        </div>
      )
    }
}

export default withFauxDOM(PopulationGraph)
