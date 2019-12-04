import axios from "axios";
const Court = require('./court');
const db = require('./queries');
const dropdown = require('./dropdown');
import Shots from './shots';
import Main from './main';
const carousel = require('./carousel');

// Court Container 
const courtContainer = {
  width: 800,
  height: 450
}

document.addEventListener("DOMContentLoaded", () => {

  let firstName = 'Stephen';
  let lastName = 'Curry';
  let season = '2015-16';
  let team = '';

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

  const seasonOption = document.querySelector('.title');
  seasonOption.addEventListener('change', (e) => {
    shots.clearShots();
    let seasonRange = e.target.innerText;
    if (seasonRange === 'Career') {
      debugger
      shots.parseCareerShots(firstName, lastName);
    } else {
      debugger
      shots.parseShots(firstName, lastName, seasonRange);
    }
  })

  const teamOption = document.querySelector('.team');
  teamOption.addEventListener('change', (e) => {
    shots.clearShots();
    team = e.target.id;
    shots.parseShotsByTeam(firstName, lastName, season, team)
  })

  const main = new Main();
  main.render();

  //get elements
  const dropdownTitle = document.querySelector('.dropdown .title');
  const dropdownOptions = document.querySelectorAll('.dropdown .option');
  const dropdownTeam = document.querySelector('.dropdown .team');
  const dropdownTeamOptions = document.querySelectorAll('.dropdown .team-menu')

  //bind listeners to these elements
  dropdownTitle.addEventListener('click', dropdown.toggleMenuDisplay);
  dropdownOptions.forEach(option => option.addEventListener('click', dropdown.handleOptionSelected));

  document.querySelector('.dropdown .title').addEventListener('change', dropdown.handleTitleChange);

  dropdownTeam.addEventListener('click', dropdown.toggleTeamMenuDisplay);
  dropdownTeamOptions.forEach(teamOption => teamOption.addEventListener('click', dropdown.handleTeamOptionSelected))

  // document.querySelector('.dropdown .team').addEventListener('change'. dropdownHandleTitleChange)


  // carousel.carouselListener();

});
