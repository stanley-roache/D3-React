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
    }

    componentDidMount() {
        this.createGlobe()
    }

    createGlobe() {
        const faux = this.props.connectFauxDOM('div', 'globeContainer')
        const props = this.props

        let width = 600,
            height = 500,
            sens = 0.25,
            focused;

        let projection = d3.geoOrthographic()
            .scale(245)
            .rotate([45, 0])
            .translate([width/2, height/2])
            .clipAngle(90)

        let path = d3.geoPath()
            .projection(projection)

        let svg = d3.select(faux).append('svg')
            .attr('width', width)
            .attr('height', height)

        svg.append('path')
            .datum({type: 'Sphere'})
            .attr('class', 'water')
            .attr('d', path)

        let countryToolTip = d3.select(faux).append('div')
            .attr('class', 'countryToolTip')

        let countryList = d3.select(faux).append('select')
            .attr('class', 'globe-select')
            .attr('name', 'countries')


        let readInData = Promise.all([
            d3.json('/world-110m.json'),
            d3.tsv('/world-110m-country-names.tsv')
        ])

        readInData.then(([world, countries]) => {
                ready(world, countries)
            })
            .catch(err => {
                throw err
            })

        function ready(worldJson, countryData, country) {
            let countries = topojson.feature(worldJson, worldJson.objects.countries).features

            const countryById = {}

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

            d3.select(faux).select("select").on("change", function (e) {
                const selectedName = d3.select(faux).select('.globe-select').node().component.value

                props.dispatch(selectCountryAction(selectedName))

                const selectedId = countryData.find(e => e.name == selectedName).id

                
                let rotate = projection.rotate(),
                    focusedCountry = countries.find(e => Number(e.id) === Number(selectedId)),
                    p = d3.geoCentroid(focusedCountry);

                svg.selectAll(".focused").classed("focused", focused = false);
        
                //Globe rotating
                d3.transition()
                    .duration(2500)
                    .tween("rotate", function() {
                        let r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
                        return t => {
                            projection.rotate(r(t));
                            svg.selectAll("path.land")
                                .attr("d", path)
                                .classed("focused", (d, i) => { 
                                    return (d.id == focusedCountry.id) ? focused = d : false; 
                                });
                        };
                    })
                props.animateFauxDOM(2700)
            });

            props.drawFauxDOM()
        }
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