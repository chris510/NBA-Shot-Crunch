import axios from "axios";
const PLAYERS = [
  {first: 'Stephen', last: 'Curry'},
  {first: 'Lebron', last: 'James'},
  {first: 'James', last: 'Harden'},
  {first: 'Russell', last: 'Westbrook'}
  // {first: 'Anthony', last: 'Davis'},
  // {first: 'Damian', last: 'Lillard'}
]

class Main {
  constructor() {
    this.getHeadshots = this.getHeadshots.bind(this);
    this.seasonSelector = this.seasonSelector.bind(this);
    this.teamSelector = this.teamSelector.bind(this);
    this.displayChartFilter = this.displayChartFilter.bind(this);
  }

  getHeadshots() {
    PLAYERS.forEach((player, idx) => {
      axios(`https://nba-players.herokuapp.com/players/${player.last}/${player.first}`).then(res => {
        let img = new Image();
        if (idx === 0) {
          img.className='carousel__photo initial'
        } else {
          img.className = 'carousel__photo'
        }
        img.width = '190';
        img.height = '140';
        img.src = `${res.config.url}`;
        img.color = 'black';
        img.alt = `${player.first} ${player.last}`;
        // img.className = 'carousel__photo'
        // document.getElementById('nba-profile-pic').appendChild(img);
        let nbaPlayer = document.createElement('div')
        nbaPlayer.setAttribute('class', 'player-container')
        document.querySelector('.carousel').appendChild(nbaPlayer).append(img);
        // document.querySelector('.carousel').appendChild(img);

        // let name = document.createElement('nba-player-name');
        // name.innerHTML = `${player.first} ${player.last}`;
        // document.querySelector('.carousel').appendChild(name);
      })
    })
  }

  seasonSelector() {
    let career = document.createElement('div');
    career.innerHTML = 'Career';
    career.setAttribute('class', 'option');
    document.querySelector(".season-menu").appendChild(career);

    for (let i = 2015; i < 2018; i++) {
      let option = document.createElement('div');
      option.setAttribute('class', 'option');
      option.innerHTML = `${i}-${(i+1)-2000}`;
      document.querySelector(".season-menu").appendChild(option);
    }
  }

  teamSelector() {
    d3.csv('./assets/nba_teams.csv').then(teams => {
      teams.forEach(team => {
        let teamOption = document.createElement('div');
        teamOption.setAttribute('class','team-option');
        teamOption.setAttribute('id',`${team.prefix_1}`);
        teamOption.innerHTML = team.name;
        document.querySelector('.team-menu').appendChild(teamOption);
      })
    })
  }

  displayChartFilter() {
    const shotContainer = document.querySelector('.shot-container');

    const chartFilter = document.createElement('div');
    chartFilter.setAttribute('class', 'chart-filter');

    const currentPlayerNameContainer = document.createElement('div');
    currentPlayerNameContainer.setAttribute('class', 'current-player-name-container');

    
    const currentPlayerName = document.createElement('div');
    currentPlayerName.setAttribute('class', 'current-player-name');
    currentPlayerName.innerText = 'Stephen Curry';
    
    shotContainer.appendChild(chartFilter)
    .appendChild(currentPlayerNameContainer)
    .appendChild(currentPlayerName);
    // chartFilter.appendChild(currentPlayerNameContainer).appendChild(currentPlayerName);

    const filterContainer = document.createElement('div');
    filterContainer.setAttribute('class', 'filter-container');

    shotContainer.appendChild(filterContainer);

    const selectSeasonContainer = document.createElement('div');
    selectSeasonContainer.setAttribute('id', 'select-season-container');
    const season = document.createElement('div');
    season.setAttribute('class', 'season');
    season.innerHTML = 'Season';

    chartFilter.appendChild(filterContainer)
      .appendChild(selectSeasonContainer)
      .appendChild(season);

    const dropdownOne = document.createElement('div');
    dropdownOne.setAttribute('class', 'dropdown');

    const dropDownTitle = document.createElement('div');
    dropDownTitle.setAttribute('class', 'title pointerCursor');
    dropDownTitle.innerHTML = '2015-16'

    const iFaFaAngle = document.createElement('i');
    iFaFaAngle.setAttribute('class', "fa fa-angle-right");

    const seasonMenu = document.createElement('div');
    seasonMenu.setAttribute('class', 'season-menu pointerCursor hide')

    dropDownTitle.appendChild(iFaFaAngle);
    dropdownOne.appendChild(dropDownTitle);
    dropdownOne.appendChild(seasonMenu);

    selectSeasonContainer.appendChild(dropdownOne);

    const selectTeamContainer = document.createElement('div');
    selectTeamContainer.setAttribute('id', 'select-team-container');
    const team = document.createElement('div');
    team.setAttribute('class', 'team-title');
    team.innerHTML = 'Team';

    filterContainer.appendChild(selectTeamContainer)
      .appendChild(team);

    const dropdownTwo = document.createElement('div');
    dropdownTwo.setAttribute('class', 'dropdown');

    const dropDownTeam = document.createElement('div');
    dropDownTeam.setAttribute('class', 'team pointerCursor');
    dropDownTeam.innerHTML = 'All'

    const teamMenu = document.createElement('div');
    teamMenu.setAttribute('class', 'team-menu pointerCursor hide')

    dropDownTitle.appendChild(iFaFaAngle);
    dropdownOne.appendChild(dropDownTeam);
    dropdownOne.appendChild(teamMenu);

    selectTeamContainer.appendChild(dropDownOne);

  }

  render() {
  }

}

export default Main;