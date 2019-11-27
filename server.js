const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import config from './webpack.config';


const players = require('./routes/players');
const shots = require("./routes/shots");


const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html')

app.use(express.static(DIST_DIR))
app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

// const app = express(),
//             DIST_DIR = __dirname,
//             HTML_FILE = path.join(DIST_DIR, 'index.html'),
//             compiler = webpack(config)
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }))
// app.get('*', (req, res, next) => {
//   compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
//   if (err) {
//     return next(err)
//   }
//   res.set('content-type', 'text/html')
//   res.send(result)
//   res.end()
//   })
// })

const port = process.env.PORT || 5000;


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, express, and Postgres API'})
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.use("/players", players);
app.use("/shots", shots);

// app.get('/shots', db.getShots)

// app.get(`/shots/${playerId}`, db.getPlayerShotsBySeason(playerId, season))
// lebron = '2544'
// app.get(`/shots/${lebron}`, db.getPlayerShotsBySeason(lebron, '2016-17'))


