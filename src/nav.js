const PLAYERS = [
  {first: 'Stephen', last: 'Curry'},
  {first: 'Lebron', last: 'James'}
  // {first: 'James', last: 'Harden'},
  // {first: 'Anthony', last: 'Davis'},
  // {first: 'Damian', last: 'Lillard'}
]

class Main {
  constructor() {
    // this.html = html;
    this.getHeadshots = this.getHeadshots.bind(this);
    this.seasonSelector = this.seasonSelector.bind(this);
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
        img.width = '250';
        img.height = '200';
        img.src = `${res.config.url}`;
        img.color = 'black';
        img.alt = `${player.first} ${player.last}`;
        // img.className = 'carousel__photo'
        // document.getElementById('nba-profile-pic').appendChild(img);
        document.querySelector('.carousel').appendChild(img);

        let name = document.createElement('nba-player-name');
        name.innerHTML = `${player.first} ${player.last}`;
        document.querySelector('.carousel').appendChild(name);
      })
    })
  }

  seasonSelector(selectedSeason = '2015-2016') {
    for (let i = 2015; i < 2018; i++) {
      let option = document.createElement('div');
      option.setAttribute('class', 'option');
      option.setAttribute('id', 'option1');
      option.innerHTML = `${i}-${(i+1)-2000}`;
      document.querySelector(".menu").appendChild(option);
    }
  }

  render() {
    this.getHeadshots();
    this.seasonSelector();
  }

}

export default Main;