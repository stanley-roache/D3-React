### Why is there an issue in integrating D3 and React?

Both D3 and React have their own built in methods for interacting directly with the DOM and only updating what is required. Things won't work if they both expect to have a full handle on the DOM, apparently there are several methods to get around this.

### First Steps

I'm using this boiler plate, which includes some stack parts I won't touch for now (redux) and following <a href="https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71">this</a> tutorial to get a basic grip on how React and D3 can meet.

This first approach has react managing the wider structure of the app, in a component where d3 is needed, an empty svg is created and d3 is passed a reference to the svg DOM-node, allowing it full reign over a limited part of the DOM, in this way they're both happy
