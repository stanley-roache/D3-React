import React, {Component} from 'react'
import * as d3 from 'd3'
import {withFauxDOM} from 'react-faux-dom'

import fetch from 'd3-fetch'

import {connect} from 'react-redux'

import {selectCountryAction} from '../actions/country'

console.log(d3.tsv);


const topojson = require('topojson')

class GlobeSelector extends Component {
    constructor(props) {
        super(props)

        this.state = {
          falseDOM: null,
          focused: null,
          projection: null,
          path: null,
          svg: null,
          countryToolTip: null,
          countryList: null,
          countryData: null,
          countries: null,
          world: null
        }

        this.initialiseGlobe = this.initialiseGlobe.bind(this)
        this.drawCountriesAndSetListeners = this.drawCountriesAndSetListeners.bind(this)
        this.handleCountryChange = this.handleCountryChange.bind(this)
        this.attachGlobeSelectListener = this.attachGlobeSelectListener.bind(this)
    }

    componentDidMount() {
        this.initialiseGlobe()
          .then(() => this.readFiles())
          .then(([world, countries]) => {
            return this.drawCountriesAndSetListeners(world, countries)
          })
          .then(() => {
            this.attachGlobeSelectListener()
          })
          .catch(err => {
            throw err
          })
    }

    initialiseGlobe() {
      console.log('initialising globe');
        const falseDOM = this.props.connectFauxDOM('div', 'globeContainer')
        const props = this.props

        let width = 600,
            height = 500,
            sens = 0.25;

        let projection = d3.geoOrthographic()
            .scale(245)
            .rotate([45, 0])
            .translate([width/2, height/2])
            .clipAngle(90)

        let path = d3.geoPath()
            .projection(projection)

        let svg = d3.select(falseDOM).append('svg')
            .attr('width', width)
            .attr('height', height)

        svg.append('path')
            .datum({type: 'Sphere'})
            .attr('class', 'water')
            .attr('d', path)

        let countryToolTip = d3.select(falseDOM).append('div')
            .attr('class', 'countryToolTip')

        let countryList = d3.select(falseDOM).append('select')
            .attr('class', 'globe-select')
            .attr('name', 'countries')

        return new Promise((resolve, reject) => {
          this.setState({
            falseDOM,
            projection,
            path,
            svg,
            countryToolTip,
            countryList
          },
          resolve)
        })
    }

    readFiles() {
      console.log('reading files');
      return Promise.all([
          d3.json('/world-110m.json'),
          d3.tsv('/world-110m-country-names.tsv')
      ])
    }

    drawCountriesAndSetListeners(worldJson, countryData) {
      console.log('drawing countries and adding mouseover listeners');
        let countries = topojson.feature(worldJson, worldJson.objects.countries).features

        const countryById = {}

        const {
          countryList,
          countryToolTip,
          path,
          svg
        } = this.state

        const props = this.props

        // pushing countries into droplist
        countryData.forEach(d => {
            countryById[d.id] = d.name
            countryList.append('option')
                    .text(d.name)
                    .property('value', d.id)
        })

        // drawing countries on globe
        let world = svg.selectAll('path.land')
            .data(countries)
            .enter().append('path')
            .attr('class', 'land')
            .attr('d', path)

        // hover on country info
        world.on("mouseover", d => {
            countryToolTip.text(countryById[d.id])
            .style("left", (d3.event.pageX + 7) + "px")
            .style("top", (d3.event.pageY - 15) + "px")
            .style("display", "block")
            .style("opacity", 1);
            props.drawFauxDOM()
          })
          .on("mouseout", d => {
            countryToolTip.style("opacity", 0)
            .style("display", "none");
            props.drawFauxDOM()
          })
          .on("mousemove", d => {
            countryToolTip.style("left", (d3.event.pageX + 7) + "px")
            .style("top", (d3.event.pageY - 15) + "px");
            props.drawFauxDOM()
          });

        props.drawFauxDOM()

        return new Promise((resolve, reject) => {
          this.setState({
            world,
            countries,
            countryData,
            svg,
            path
          }, resolve)
        })
    }

    attachGlobeSelectListener() {
      console.log('adding globe select listener');
      this.state.countryList.on("change", this.handleCountryChange);
    }

    handleCountryChange(e) {
      const props = this.props

      const {
        falseDOM,
        countryData,
        projection,
        svg,
        path,
        countries
      } = this.state

      let {focused} = this.state

      const selectedName = d3.select(falseDOM)
                            .select('.globe-select')
                            .node().component.value

      props.dispatch(selectCountryAction(selectedName))

      const selectedId = countryData.find(e => e.name == selectedName).id

      let rotate = projection.rotate(),
          focusedCountry = countries.find(e => Number(e.id) === Number(selectedId)),
          p = d3.geoCentroid(focusedCountry);

      svg.selectAll(".focused").classed("focused", focused = false);

      //Globe rotating
      d3.transition()
      .duration(2500)
      .tween("rotate", () => {
        let r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
        return t => {
          projection.rotate(r(t));
          svg.selectAll("path.land")
            .attr("d", path)
            .classed("focused", (d, i) => {
              if (d.id == focusedCountry.id) {
                let focused = d
                this.setState({focused})
                return true
              } else return false;
            });
        };
      })
      props.animateFauxDOM(2700)
    }

    render() {
        return (
            <div>
                {this.props.globeContainer}
            </div>
        )
    }
}

export default connect()(withFauxDOM(GlobeSelector))
