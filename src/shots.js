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
  }

  clearShots() {
    d3.selectAll("g").remove();
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

  parseShotsByTeam(firstName = 'Stephen', lastName = 'Curry', season = '2015-16', team = null) {
    d3.csv(`./data/${firstName}_${lastName}_${season}.csv`).then(shots => {
      shots.forEach( shot => {
        if (shot.team_name === team) {
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