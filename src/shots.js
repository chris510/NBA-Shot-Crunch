const CONSTANTS = {
  ROWS: 50,
  COLS: 47,
  WIDTH: 550,
  HEIGHT: 470,
  SHOT_OPACITY: "0.8",
}

class Shots {
  constructor(svg) {
    this.svg = svg;
    this.clearShots = this.clearShots.bind(this);
    this.parseShots = this.parseShots.bind(this);
    this.renderShots = this.renderShots.bind(this);
    this.parseShotsByTeam = this.parseShotsByTeam.bind(this);
    this.parseCareerShots = this.parseCareerShots.bind(this);
    this.getTotalShots = this.getTotalShots.bind(this);
    this.getShotPercentage = this.getShotPercentage.bind(this);
    this.parseByShotResult = this.parseByShotResult.bind(this);
    this.getMadeShots = this.getMadeShots.bind(this);
  }

  clearShots() {
    d3.selectAll("g").remove();
  }

  getTotalShots(shots) {
    let totalShots = shots;
    return totalShots
  }

  getShotPercentage(shots) {

  }

  getMadeShots(shotX, shotY, shotOutcome) {
    if (shotOutcome === 'Made Shot') {
      this.renderShots([shotX, shotY], shotOutcome);
    } else if (shotOutcome === 'Missed Shot') {
      this.renderShots([shotX, shotY], shotOutcome);
    }
  }

  parseByShotResult(firstName = 'Stephen', lastName = 'Curry', season = '2015-16', type = '', team = 'All', shotResult = 'All') {
    if (type === 'career') {
      for (let i = 2015; i < 2018; i++) {
        let season = `${i}-${(i+1)-2000}`
        d3.csv(`./assets/${firstName}_${lastName}_${season}.csv`).then(shots => {
          shots.forEach( shot => {
              let shotOutcome = shot.event_type;
              let shotX = shot.loc_x;
              let shotY = shot.loc_y;
              if (shotResult === 'All') {
                this.getMadeShots(shotX, shotY, shotOutcome);
              } else if (shotResult === 'Made' && shotOutcome === 'Made Shot') {
                this.getMadeShots(shotX, shotY, shotOutcome)
              } else if (shotResult === 'Missed' && shotOutcome === 'Missed Shot') {
                this.getMadeShots(shotX, shotY, shotOutcome)
              }
          })
        })
      }
    } else if (type === 'season') {
      d3.csv(`./assets/${firstName}_${lastName}_${season}.csv`).then(shots => {
        shots.forEach( shot => {
          let shotOutcome = shot.event_type;
          let shotX = shot.loc_x;
          let shotY = shot.loc_y;
          if (shotResult === 'All') {
            this.getMadeShots(shotX, shotY, shotOutcome);
          } else if (shotResult === 'Made' && shotOutcome === 'Made Shot') {
            this.getMadeShots(shotX, shotY, shotOutcome)
          } else if (shotResult === 'Missed' && shotOutcome === 'Missed Shot') {
            this.getMadeShots(shotX, shotY, shotOutcome)
          }
        })
      })
    }
  }

  parseCareerShots(firstName = 'Stephen', lastName = "Curry") {
    for (let i = 2015; i < 2018; i++) {
      let season = `${i}-${(i+1)-2000}`
      d3.csv(`./assets/${firstName}_${lastName}_${season}.csv`).then(shots => {
        shots.forEach( shot => {
          let shotOutcome = shot.event_type;
          let shotX = shot.loc_x;
          let shotY = shot.loc_y;
          this.getMadeShots(shotX, shotY, shotOutcome);
        })
      })
    }
  }

  parseShots(firstName = 'Stephen', lastName = 'Curry', season = '2015-16') {
    d3.csv(`./assets/${firstName}_${lastName}_${season}.csv`).then(shots => { 
      shots.forEach( shot => {
        let shotOutcome = shot.event_type;
        let shotX = shot.loc_x;
        let shotY = shot.loc_y;
        this.getMadeShots(shotX, shotY, shotOutcome);
      })
    })
  }

  parseShotsByTeam(firstName = 'Stephen', lastName = 'Curry', season = '2015-16', team = '', type = '') {
    if (type === 'career') {
      for (let i = 2015; i < 2018; i++) {
        let season = `${i}-${(i+1)-2000}`
        d3.csv(`./assets/${firstName}_${lastName}_${season}.csv`).then(shots => {
          shots.forEach( shot => {
            if (shot.visiting_team === team) {
              let shotOutcome = shot.event_type;
              let shotX = shot.loc_x;
              let shotY = shot.loc_y;
              this.getMadeShots(shotX, shotY, shotOutcome);
            }
          })
        })
      }
    } else {
      d3.csv(`./assets/${firstName}_${lastName}_${season}.csv`).then(shots => {
        shots.forEach( shot => {
          if (shot.visiting_team === team) {
            let shotOutcome = shot.event_type;
            let shotX = shot.loc_x;
            let shotY = shot.loc_y;
            this.getMadeShots(shotX, shotY, shotOutcome);
          }
        })
      })
    }
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
          .attr('class', 'made-shot')
          .attr("stroke", "white")
          .attr('transform', 'translate(250, 52.5)')
          .attr("fill", "skyblue")
          .attr("fill-opacity", CONSTANTS.SHOT_OPACITY)
          .attr("stroke-width", "0.1px")
          .attr("transform", "rotate(180 125,208.5)")
      } else if (shotOutcome === "Missed Shot") {
        this.svg.append("g")
          .selectAll(".hexagon")
          .data(hexbin([playerPos]))
          .enter().append("path")
          .attr("d", function (d) {
            return "M" + d.x + "," + d.y + hexbin.hexagon();
          })
          .attr('class', 'missed-shot')
          .attr("stroke", "white")
          .attr('transform', 'translate(250, 52.5)')
          .attr("fill", "darkred")
          .attr("fill-opacity", CONSTANTS.SHOT_OPACITY)
          .attr("stroke-width", "0.1px")
          .attr("transform", "rotate(180 125,208.5)");
      }
  }
}

var delta = 0.001,
    i = 0, j,
    n = 2000, // Total number of random points.
    k = 20; // Number of points to replace per frame.

var rx = d3.randomNormal(CONSTANTS.WIDTH / 2, 80),
ry = d3.randomNormal(CONSTANTS.HEIGHT / 2, 80),
points = d3.range(n).map(function() { return [rx(), ry()]; });

export default Shots;