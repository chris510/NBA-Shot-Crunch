import axios from "axios";
const Court = require('./court');
const db = require('./queries');


// Court Container 
const courtContainer = {
  width: 800,
  height: 600
}

document.addEventListener("DOMContentLoaded", () => {

  let chartContainer = document.getElementById('chart-container')
  let chart = d3.select(chartContainer)
    .append('svg')
    .attr("width", courtContainer.width)
    .attr("height", courtContainer.height)
    .attr('fill', 'blue');

  const court = new Court(chart)
  court.render();

  console.log('Hello')

  // d3.json('/shots').then( res => console.log(res));
  const getLebronShots = () => {
    debugger
    axios.get('/shots')
  }

  getLebronShots().then(res => console.log(res))
  // console.log('Hello')
});