import axios from "axios";
const Court = require('./court');
const db = require('./queries');
import Shots from './shots';
import Main from './main';

window.axios = axios;


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

  let shots = new Shots(chart);
  shots.parseShots();

  let playerImgContainer = document.getElementById('nba-profile-pic-container')
  const main = new Main();
  // main.render();
  main.getHeadshots();

});
