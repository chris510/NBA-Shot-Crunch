import axios from "axios";
const Court = require('./court');
const db = require('./queries');
const dropdown = require('./dropdown');
import Shots from './shots';
import Main from './main';
const carousel = require('./carousel');
import { teamSelector, renderCourt, renderBody, renderFooter, renderSplashPage } from "./helpers";

// Court Container 
const courtContainer = {
  width: 800,
  height: 450
}

document.addEventListener("DOMContentLoaded", () => {

  renderSplashPage();

  d3.selectAll(".lucky")
    .append("input")
    .property("type", "button")
    .attr("class", "randombutton")
    .on("click", function(d, i) {

      renderBody();

      let firstName = 'Stephen';
      let lastName = 'Curry';
      let playerTeam = 'Golden State Warriors'
      let season = '2015-16';
      let team = '';
      let type = 'season'
  // let currentPlayerNameHTML = document.querySelector('#current-player-name');
  // currentPlayerNameHTML.innerHTML = `${firstName} ${lastName}`;
  
  const main = new Main();
  renderCourt();
  main.displayChartFilter();

  let chartContainer = document.getElementById('chart-container')
  let chart = d3.select(chartContainer)
    .append('svg')
    .attr('class', 'chart')
    .attr("width", courtContainer.width)
    .attr("height", courtContainer.height)
  
  // const court = new Court(chart)
  // court.render();

  let shots = new Shots(chart);
  shots.parseShots();
  // console.log(shots.parseShots());

  const court = new Court(chart)
  court.render();

  const seasonOption = document.querySelector('.title');
  seasonOption.addEventListener('change', (e) => {
    shots.clearShots();
    let seasonRange = e.target.innerText;
    if (seasonRange === 'Career') {
      type = 'career';
      shots.parseCareerShots(firstName, lastName);
    } else {
      shots.parseShots(firstName, lastName, seasonRange);
    }
    let currentTeamHTML = document.querySelector('.team');
    currentTeamHTML.innerHTML = 'All';
  })

  const teamOption = document.querySelector('.team');
  teamOption.addEventListener('change', (e) => {
    shots.clearShots();
    team = e.target.id;
    shots.parseShotsByTeam(firstName, lastName, season, team, type)
  })

  // main.render();
  main.getHeadshots();
  main.seasonSelector();
  teamSelector(playerTeam);
  
  renderFooter();

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

  const openModal = document.getElementById("open-modal");
  const modal = document.getElementById('instructions');
  const exitButton = document.getElementById("modal-close");

  openModal.addEventListener('mousedown', (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  exitButton.addEventListener('mousedown', (e) => {
    e.preventDefault();
    modal.style.display = "none";
  });

  window.onclick = (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };

  const player = document.querySelector('.carousel');
  player.addEventListener('click', (e) => {
    shots.clearShots();

    let playerName = e.target.alt.split(' ');
    firstName = playerName[0];
    lastName = playerName[1];
    season = '2015-16';
    team = '';

    let currentPlayerNameHTML = document.querySelector('.current-player-name');
    currentPlayerNameHTML.innerHTML = `${firstName} ${lastName}`;

    //Resets filters to proper option when selecting new player
    let iTagOne = document.createElement('i');
    iTagOne.setAttribute('class', 'fa fa-angle-right');

    document.querySelector('.title').innerHTML = '2015-16';
    document.querySelector('.team').innerHTML = 'All';
    document.querySelector('.team').appendChild(iTagOne.cloneNode(true));
    document.querySelector('.title').appendChild(iTagOne.cloneNode(true));

    shots.parseShots(firstName, lastName)
  });

  })

  // let firstName = 'Stephen';
  // let lastName = 'Curry';
  // let playerTeam = 'Golden State Warriors'
  // let season = '2015-16';
  // let team = '';
  // let type = 'season'

  // // let currentPlayerNameHTML = document.querySelector('#current-player-name');
  // // currentPlayerNameHTML.innerHTML = `${firstName} ${lastName}`;

  // let chartContainer = document.getElementById('chart-container')
  // let chart = d3.select(chartContainer)
  //   .append('svg')
  //   .attr('class', 'chart')
  //   .attr("width", courtContainer.width)
  //   .attr("height", courtContainer.height)
  //   // .attr('fill', 'blue');

  // const court = new Court(chart)
  // court.render();

  // let shots = new Shots(chart);
  // shots.parseShots();
  // // console.log(shots.parseShots());

  // const player = document.querySelector('.carousel');
  // player.addEventListener('click', (e) => {
  //   shots.clearShots();

  //   let playerName = e.target.alt.split(' ');
  //   firstName = playerName[0];
  //   lastName = playerName[1];
  //   season = '2015-16';
  //   team = '';

  //   let currentPlayerNameHTML = document.querySelector('.current-player-name');
  //   currentPlayerNameHTML.innerHTML = `${firstName} ${lastName}`;

  //   //Resets filters to proper option when selecting new player
  //   let iTagOne = document.createElement('i');
  //   iTagOne.setAttribute('class', 'fa fa-angle-right');

  //   document.querySelector('.title').innerHTML = '2015-16';
  //   document.querySelector('.team').innerHTML = 'All';
  //   document.querySelector('.team').appendChild(iTagOne.cloneNode(true));
  //   document.querySelector('.title').appendChild(iTagOne.cloneNode(true));



  //   shots.parseShots(firstName, lastName)
  // });

  // const seasonOption = document.querySelector('.title');
  // seasonOption.addEventListener('change', (e) => {
  //   shots.clearShots();
  //   let seasonRange = e.target.innerText;
  //   if (seasonRange === 'Career') {
  //     type = 'career';
  //     shots.parseCareerShots(firstName, lastName);
  //   } else {
  //     shots.parseShots(firstName, lastName, seasonRange);
  //   }
  //   let currentTeamHTML = document.querySelector('.team');
  //   currentTeamHTML.innerHTML = 'All';
  // })

  // const teamOption = document.querySelector('.team');
  // teamOption.addEventListener('change', (e) => {
  //   shots.clearShots();
  //   team = e.target.id;
  //   shots.parseShotsByTeam(firstName, lastName, season, team, type)
  // })

  // const main = new Main();
  // // main.render();
  // main.getHeadshots();
  // main.seasonSelector();
  // teamSelector(playerTeam);

  // //get elements
  // const dropdownTitle = document.querySelector('.dropdown .title');
  // const dropdownOptions = document.querySelectorAll('.dropdown .option');
  // const dropdownTeam = document.querySelector('.dropdown .team');
  // const dropdownTeamOptions = document.querySelectorAll('.dropdown .team-menu')

  // //bind listeners to these elements
  // dropdownTitle.addEventListener('click', dropdown.toggleMenuDisplay);
  // dropdownOptions.forEach(option => option.addEventListener('click', dropdown.handleOptionSelected));

  // document.querySelector('.dropdown .title').addEventListener('change', dropdown.handleTitleChange);

  // dropdownTeam.addEventListener('click', dropdown.toggleTeamMenuDisplay);
  // dropdownTeamOptions.forEach(teamOption => teamOption.addEventListener('click', dropdown.handleTeamOptionSelected))

  // // document.querySelector('.dropdown .team').addEventListener('change'. dropdownHandleTitleChange)


  // // carousel.carouselListener();

  // const openModal = document.getElementById("open-modal");
  // const modal = document.getElementById('instructions');
  // const exitButton = document.getElementById("modal-close");

  // openModal.addEventListener('mousedown', (e) => {
  //   e.preventDefault();
  //   modal.style.display = "block";
  // });

  // exitButton.addEventListener('mousedown', (e) => {
  //   e.preventDefault();
  //   modal.style.display = "none";
  // });

  // window.onclick = (e) => {
  //   if (e.target == modal) {
  //     modal.style.display = "none";
  //   }
  // };
});
