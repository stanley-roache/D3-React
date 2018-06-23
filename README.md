### Why is there an issue in integrating D3 and React?

Both D3 and React have their own built in methods for interacting directly with the DOM and only updating what is required. Things won't work if they both expect to have a full handle on the DOM, apparently there are several methods to get around this.

### First Steps

I'm using this boiler plate, which includes some stack parts I won't touch for now (redux) and following <a href="https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71">this</a> tutorial to get a basic grip on how React and D3 can meet.

This first approach has react managing the wider structure of the app, in a component where d3 is needed, an empty svg is created and d3 is passed a reference to the svg DOM-node, allowing it full reign over a limited part of the DOM, in this way they're both happy.

The difficulty with this approach lies in communication between React and D3 about when to render, that's the key link
<details>
  <summary>
    <b> Another method: re-Implementing D3 functions in react</b>
  </summary>
    <a href="https://medium.com/front-end-hacking/if-and-when-to-use-d3-js-with-react-639a651c6257">Here</a> is an example of     the other way of doing it, D3's power comes down partially to it's enter/update/exit suite, which allows it to check with     the DOM how many elements need creating, updating and deleting respectively as the data is altered.

   This core functionality can be written into React, this kind of takes the teeth out of D3 in what is being asked to do but  fair enough. Often this is easier when the relationship between data and display is kept simple. For more advanced relationships, the first method of passing a node to D3 can be easier,

~~maybe I'll try to implement both~~ - not interesting enough right now
</details>




### Note Dump
- Climate data to play with:
  - http://worldclim.org/version2
  - https://www.ncdc.noaa.gov/cdo-web/datasets
  - http://iridl.ldeo.columbia.edu/
- <a href="https://github.com/geotiffjs/geotiff.js">GeoTiff parser</a>
