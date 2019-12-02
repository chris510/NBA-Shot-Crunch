const PLAYERS = [
  {first: 'Stephen', last: 'Curry'},
  {first: 'Lebron', last: 'James'},
  {first: 'James', last: 'Harden'},
  {first: 'Anthony', last: 'Davis'},
  {first: 'Damian', last: 'Lillard'}
]

class Main {
  constructor() {
    // this.html = html;
    this.getHeadshots = this.getHeadshots.bind(this);
    this.seasonSelector = this.seasonSelector.bind(this);
  }

  getHeadshots() {
    PLAYERS.forEach(player => {
      axios(`https://nba-players.herokuapp.com/players/${player.last}/${player.first}`).then(res => {
        let img = new Image();
        img.width = '250';
        img.height = '200';
        img.src = `${res.config.url}`;
        img.color = 'black';
        document.getElementById('nba-profile-pic').appendChild(img);

        let name = document.createElement('nba-player-name');
        name.innerHTML = `${player.first} ${player.last}`;
        document.getElementById('nba-profile-pic').appendChild(name);
      })
    })
  }

  seasonSelector(selectedSeason = '2015-2016') {
    for (let i = 2014; i < 2019; i++) {
      let option = document.createElement('div');
      option.setAttribute('class', 'option');
      option.setAttribute('id', 'option1');
      option.innerHTML = `${i}-${i+1}`;
      document.querySelector(".menu").appendChild(option);
    }
  }

  render() {
    this.getHeadshots();
    this.seasonSelector();
  }

}

export default Main;