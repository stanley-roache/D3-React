import React, {Component} from 'react'
import * as d3 from 'd3'
import {withFauxDOM} from 'react-faux-dom'

import fetch from 'd3-fetch'

console.log(d3.tsv);


import topojson from 'topojson-client'

class GlobeSelector extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.createGlobe()
    }

    createGlobe() {
        const faux = this.props.connectFauxDOM('div', 'globeContainer')

        let width = 600,
            height = 500,
            sens = 0.25,
            focused;

        let projection = d3.geoOrthographic()
            .scale(245)
            .rotate([0, 0])
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

        this.props.animateFauxDOM(10)

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

        function ready(world, countryData) {
            console.log({world, countryData});
            
            
            let countryById = {}

            console.log({topojson});
            

            countries = topojson.feature(world, world.objects.countries).features

            // pushing countries into droplist
            countryData.forEach(d => {
                countryById[d.id] = d.name 
                option = countryList.append('option')
                option.text(d.name)
                option.property('value', d.id)
            })

            // // drawing countries on globe
            // let countryOutlines = svg.selectAll('path.land')
            //     .data(countries)
            //     .enter().append('path')
            //     .attr('class', 'land')
            //     .attr('d', path)
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

export default withFauxDOM(GlobeSelector)