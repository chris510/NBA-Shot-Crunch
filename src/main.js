import axios from "axios";
const PLAYERS = [
  {first: 'Stephen', last: 'Curry'},
  {first: 'Lebron', last: 'James'},
  {first: 'James', last: 'Harden'}
  // {first: 'Anthony', last: 'Davis'},
  // {first: 'Damian', last: 'Lillard'}
]

class Main {
  constructor() {
    this.getHeadshots = this.getHeadshots.bind(this);
    this.seasonSelector = this.seasonSelector.bind(this);
    this.teamSelector = this.teamSelector.bind(this);
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
        img.width = '200';
        img.height = '150';
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
    d3.csv('./data/nba_teams.csv').then(teams => {
      teams.forEach(team => {
        let teamOption = document.createElement('div');
        teamOption.setAttribute('class','team-option');
        teamOption.setAttribute('id',`${team.prefix_1}`);
        teamOption.innerHTML = team.name;
        document.querySelector('.team-menu').appendChild(teamOption);
      })
    })
  }

  render() {
    this.getHeadshots();
    this.seasonSelector();
    this.teamSelector();
  }

}

export default Main;