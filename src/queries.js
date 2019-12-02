const Pool = require('pg').Pool

const pool = new Pool({
  user: 'chris',
  host: 'localhost',
  database: 'nba-shots-db_development',
  password: 'password',
  port: 5432,
});

// Stephen Curry's shots form 16-17 season;


const getShots = (request, response) => {
  pool.query("SELECT * FROM Shots WHERE season='2016-17' AND player_nba_id='201939' ", (error, results) => {
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
