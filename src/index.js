import axios from "axios";
const Court = require('./court');
const db = require('./queries');


// Court Container 
const courtContainer = {
  width: 800,
  height: 600
}

const Pool = require('pg').Pool

const pool = new Pool({
  user: 'chris',
  host: 'localhost',
  database: 'nba-shots-db_development',
  password: 'password',
  port: 5432,
});

//LEBRONS SEASON SHOTS FOR 2016-17 AND

const getShots = (request, response) => {
  pool.query("SELECT * FROM Shots WHERE season='2016-17' AND player_nba_id='2544' ", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

document.addEventListener("DOMContentLoaded", () => {

  let chartContainer = document.getElementById('chart-container')
  let chart = d3.select(chartContainer)
    .append('svg')
    .attr("width", courtContainer.width)
    .attr("height", courtContainer.height)
    .attr('fill', 'blue');

  const court = new Court(chart)
  court.render();

  console.log('Hello')

  // d3.json('/shots').then( res => console.log(res));
  const getLebronShots = () => (
    axios('/shots')
  )

  

  getLebronShots().then( res => console.log(d3.json(res)))
  // console.log('Hello')
});