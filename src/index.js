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
  height: 450
}

document.addEventListener("DOMContentLoaded", () => {

  let firstName = 'Stephen';
  let lastName = 'Curry';

  let chartContainer = document.getElementById('chart-container')
  let chart = d3.select(chartContainer)
    .append('svg')
    .attr('class', 'chart')
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
    firstName = playerName[0];
    lastName = playerName[1];

    shots.parseShots(firstName, lastName)
  });

  const season = document.querySelector('.title');
  season.addEventListener('change', (e) => {
    shots.clearShots();
    let seasonRange = e.target.innerText;
    shots.parseShots(firstName, lastName, seasonRange);
  })

  const main = new Main();
  main.render();

  //get elements
  const dropdownTitle = document.querySelector('.dropdown .title');
  const dropdownTeam = document.querySelector('.dropdown .team');
  const dropdownOptions = document.querySelectorAll('.dropdown .option');

  //bind listeners to these elements
  dropdownTitle.addEventListener('click', dropdown.toggleMenuDisplay);
  dropdownTeam.addEventListener('click', dropdown.toggleTeamMenuDisplay);
  dropdownOptions.forEach(option => option.addEventListener('click', dropdown.handleOptionSelected));
  document.querySelector('.dropdown .title').addEventListener('change', dropdown.handleTitleChange);

  // carousel.carouselListener();

});
