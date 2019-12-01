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
  }

  getHeadshots() {
    PLAYERS.forEach(player => {
      axios(`https://nba-players.herokuapp.com/players/${player.last}/${player.first}`).then(res => {
        let img = new Image();
        img.src = `${res.config.url}`;
        document.getElementById('nba-profile-pic-container').appendChild(img); 
        // this.html.append('img')
        //   .attr("src", `${res.config.url}`)
        //   .attr("width", "300")
        //   .attr("height", "300")
        //   .attr("alt", `${player.first} ${player.last}`);
      })
    })
  }

  render() {
    this.getHeadshots();
  }

}

export default Main;