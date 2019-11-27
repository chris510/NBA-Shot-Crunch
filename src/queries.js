const Pool = require('pg').Pool
// const {Client} = require('pg')

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

const getPlayerShotsBySeason = (request, response) => {
  pool.query(`SELECT * FROM Shots WHERE season='${request.season}' AND player_nba_id='${request.playerId}'`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = { 
  getShots,
  getPlayerShotsBySeason
}
