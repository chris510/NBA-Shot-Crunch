import axios from "axios";
const Court = require('./court');
const db = require('./queries');
import Shots from './shots';


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
    // .attr('fill', 'blue');

  const court = new Court(chart)
  court.render();

  console.log('Hello')

  // const getLebronShots = () => (
  //   axios('/shots')
  // )

  // let poop;
  // const setVariable = (result) => {
  //   return result.data
  // };

  // let data = getLebronShots().then(setVariable)
  // data.then(res => poop = res);

  // console.log("wait")
  // console.log(getLebronShots())

  let shots = new Shots(chart);
  shots.parseShots();

});