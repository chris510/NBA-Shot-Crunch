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
    let totalShots = 0;
    d3.csv(`./data/${firstName}_${lastName}_${season}.csv`).then(shots => { 
      shots.forEach( shot => {
        totalShots++;
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

  parseShotsByTeam(firstName = 'Stephen', lastName = 'Curry', season = '2015-16', team = '', type = '') {
    if (type === 'career') {
      for (let i = 2015; i < 2018; i++) {
        let season = `${i}-${(i+1)-2000}`
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
    } else {
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