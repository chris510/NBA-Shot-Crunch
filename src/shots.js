const CONSTANTS = {
  ROWS: 50,
  COLS: 47,
  WIDTH: 550,
  HEIGHT: 470,
  SHOT_OPACITY: "0.8",
}

// const NBA_TEAMS = {
// 'Boston Celtics': 'BOS',
// Brooklyn Nets,BKN,brooklyn-nets
// New York Knicks,NYK,new-york-knicks
// Philadelphia 76ers,PHI,philadelphia-76ers
// Toronto Raptors,TOR,toronto-raptors
// Golden State Warriors,GSW,golden-state-warriors
// Los Angeles Clippers,LAC,los-angeles-clippers
// Los Angeles Lakers,LAL,los-angeles-lakers
// Phoenix Suns,PHX,phoenix-suns
// Sacramento Kings,SAC,sacramento-kings
// Chicago Bulls,CHI,chicago-bulls
// Cleveland Cavaliers,CLE,cleveland-cavaliers
// Detroit Pistons,DET,detroit-pistons
// Indiana Pacers,IND,indiana-pacers
// Milwaukee Bucks,MIL,milwaukee-bucks
// Dallas Mavericks,DAL,dallas-mavericks
// Houston Rockets,HOU,houston-rockets
// Memphis Grizzlies,MEM,memphis-grizzlies
// New Orleans Hornets,NOP,new-orleans-hornets
// San Antonio Spurs,SAS,san-antonio-spurs
// Atlanta Hawks,ATL,atlanta-hawks
// Charlotte Bobcats,CHA,charlotte-bobcats
// Miami Heat,MIA,miami-heat
// Orlando Magic,ORL,orlando-magic
// Washington Wizards,WSH,washington-wizards
// Denver Nuggets,DEV,denver-nuggets
// Minnesota Timberwolves,MIN,minnesota-timberwolves
// Oklahoma City Thunder,OKC,oklahoma-city-thunder
// Portland Trail Blazers,POR,portland-trail-blazers
// Utah Jazz,UTA,utah-jazz

// }

class Shots {
  constructor(svg) {
    this.svg = svg;
    this.clearShots = this.clearShots.bind(this);
    this.parseShots = this.parseShots.bind(this);
    this.renderShots = this.renderShots.bind(this);
    this.parseShotsByTeam = this.parseShotsByTeam.bind(this);
    this.parseCareerShots = this.parseCareerShots.bind(this);
  }

  clearShots() {
    d3.selectAll("g").remove();
  }

  parseCareerShots(firstName = 'Stephen', lastName = "Curry") {
    for (let i = 2015; i < 2018; i++) {
      let season = `${i}-${(i+1)-2000}`
      d3.csv(`./data/${firstName}_${lastName}_${season}.csv`).then(shots => {
        shots.forEach( shot => {
          let shotOutcome = shot.event_type;
          let shotX = shot.loc_x;
          let shotY = shot.loc_y;
          if (shotOutcome === 'Made Shot') {
            this.renderShots([shotX, shotY], shotOutcome);
          } else if (shotOutcome === 'Missed Shot') {
            this.renderShots([shotX, shotY], shotOutcome);
          }
        })
      })
    }
  }

  parseShots(firstName = 'Stephen', lastName = 'Curry', season = '2015-16') {
    // axios('/shots')
  d3.csv(`./data/${firstName}_${lastName}_${season}.csv`).then(shots => {
    shots.forEach( shot => {
      let shotOutcome = shot.event_type;
      let shotX = shot.loc_x;
      let shotY = shot.loc_y;
      if (shotOutcome === 'Made Shot') {
        this.renderShots([shotX, shotY], shotOutcome);
      } else if (shotOutcome === 'Missed Shot') {
        this.renderShots([shotX, shotY], shotOutcome);
      }
    })
  })
}

  parseShotsByTeam(firstName = 'Stephen', lastName = 'Curry', season = '2015-16', team = '') {
    d3.csv(`./data/${firstName}_${lastName}_${season}.csv`).then(shots => {
      shots.forEach( shot => {
        if (shot.visiting_team === team) {
          let shotOutcome = shot.event_type;
          let shotX = shot.loc_x;
          let shotY = shot.loc_y;
          if (shotOutcome === 'Made Shot') {
            this.renderShots([shotX, shotY], shotOutcome);
          } else if (shotOutcome === 'Missed Shot') {
            this.renderShots([shotX, shotY], shotOutcome);
          }
        }
      })
    })
  }

  renderShots(playerPos, shotOutcome) {
    const hexbin = d3.hexbin().radius(5);

      if(shotOutcome === "Made Shot") {
        this.svg.append("g")
          .selectAll(".hexagon")
          .data(hexbin([playerPos]))
          .enter().append("path")
          .attr("d", function (d) {
              return "M" + d.x + "," + d.y + hexbin.hexagon();
          })
          .attr("stroke", "white")
          .attr('transform', 'translate(250, 52.5)')
          .attr("fill", "skyblue")
          .attr("fill-opacity", CONSTANTS.SHOT_OPACITY)
          .attr("stroke-width", "0.1px")
          .attr("transform", "rotate(180 125,208.5)");
      } else if (shotOutcome === "Missed Shot") {
        this.svg.append("g")
          .selectAll(".hexagon")
          .data(hexbin([playerPos]))
          .enter().append("path")
          .attr("d", function (d) {
              return "M" + d.x + "," + d.y + hexbin.hexagon();
          })
          .attr("stroke", "white")
          .attr('transform', 'translate(250, 52.5)')
          .attr("fill", "darkred")
          .attr("fill-opacity", CONSTANTS.SHOT_OPACITY)
          .attr("stroke-width", "0.1px")
          .attr("transform", "rotate(180 125,208.5)");
      }
  }
}

export default Shots;