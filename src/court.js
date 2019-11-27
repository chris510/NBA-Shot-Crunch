class Court {
  constructor(chart) {
    this.chart = chart;
  }

  render() {
    const halfCourtWidth = 500;
    const halfCourtHeight = 470;

    // container dimensions
    const insidePaintWidth = 160;
    const insidePaintHeight = 190;
    const cornerThreePoint = 330;

    const pi = Math.PI;

  // black background
  this.chart.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', halfCourtWidth)
    .attr('height', halfCourtHeight)
    .attr('fill', 'black');

  // key 
  this.chart.append('rect')
    .attr('x', 170)
    .attr('y', 280)
    .attr('width', insidePaintWidth)
    .attr('height', insidePaintHeight)
    .attr('stroke', 'white');

  // three- point side left line
  this.chart.append("line")
    .attr("x1", 30)
    .attr("y1", 500)
    .attr("x2", 30)
    .attr("y2", cornerThreePoint)
    .attr("stroke", "white");

  // three - point side right line
  this.chart.append("line")
    .attr("x1", 470)
    .attr("y1", 500)
    .attr("x2", 470)
    .attr("y2", cornerThreePoint)
    .attr("stroke", "white");

  const threePointArc = d3.arc()
    .innerRadius(239)
    .outerRadius(240)
    .startAngle(-90 * (pi / 180))
    .endAngle(90 * (pi / 180))

  this.chart.append("path")
    .attr("d", threePointArc)
    .attr("fill", "white")
    .attr("transform", "translate(250, 425)")

  // backboard
  this.chart.append("line")
    .attr("x1", 220)
    .attr("y1", 430)
    .attr("x2", 280)
    .attr("y2", 430)
    .attr("stroke", "white")
    .attr("stroke-width", "0.3%");

  // rim arc
  const rimArc = d3.arc()
    .innerRadius(40)
    .outerRadius(41)
    .startAngle(-90 * (pi / 180))
    .endAngle(90 * (pi / 180))

  this.chart.append("path")
    .attr("d", rimArc)
    .attr("fill", "white")
    .attr("transform", "translate(250, 425)")

  // rim 
  this.chart.append("circle")
    .attr("cx", 250)
    .attr("cy", 447.5)
    .attr("r", 7.5)
    .attr("stroke", "white");

  // rim block
  this.chart.append('rect')
    .attr('x', 246.5)
    .attr('y', 430)
    .attr('width', 7)
    .attr('height', 5)
    .attr('fill', 'white');

  // cover left-side arc
  this.chart.append('rect')
    .attr('x', 0)
    .attr('y', 330)
    .attr('width', 29.5)
    .attr('height', 140)
    .attr('fill', 'blue');

  this.chart.append('rect')
    .attr('x', 470.5)
    .attr('y', 330)
    .attr('width', 29)
    .attr('height', 140)
    .attr('fill', 'blue');
  }
}

module.exports = Court;