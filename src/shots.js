import axios from "axios";
import { appendFile } from "fs";

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
    this.parseShots = this.parseShots.bind(this);
  };

  parseShots() {
    axios('/shots').then(res => {
      let parsed = res.data;
      parsed.forEach( shot => {
        let shotOutcome = shot.event_type;
        let shotX = shot.loc_x;
        let shotY = shot.loc_y;
        if (shotOutcome === 'Made Shot') {
          this.render([shotX, shotY], shotOutcome);
        } else if (shotOutcome === 'Missed Shot') {
          this.render([shotX, shotY], shotOutcome);
        }
      })
    });
  }

  render(playerPos, shotOutcome) {
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