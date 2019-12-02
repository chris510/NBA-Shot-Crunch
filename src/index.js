import axios from "axios";
const Court = require('./court');
const db = require('./queries');
const dropdown = require('./dropdown');
import Shots from './shots';
import Main from './nav';
const carousel = require('./carousel');



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

  const player = document.querySelector('.carousel');
  player.addEventListener('click', (e) => {
    shots.clearShots();

    let playerName = e.target.alt.split(' ');
    let firstName = playerName[0];
    let lastName = playerName[1];

    shots.parseShots(firstName, lastName)
  });

  const season = document.querySelector('.title');
  season.addEventListener('change', (e) => {
    shots.clearShots();
    let seasonRange = e.target.innerText;
    shots.parseShots('Stephen', 'Curry', seasonRange);
  })

  const main = new Main();
  main.render();

  //get elements
  const dropdownTitle = document.querySelector('.dropdown .title');
  const dropdownOptions = document.querySelectorAll('.dropdown .option');

  //bind listeners to these elements
  dropdownTitle.addEventListener('click', dropdown.toggleMenuDisplay);
  dropdownOptions.forEach(option => option.addEventListener('click', dropdown.handleOptionSelected));
  document.querySelector('.dropdown .title').addEventListener('change', dropdown.handleTitleChange);

  // carousel.carouselListener();

});
