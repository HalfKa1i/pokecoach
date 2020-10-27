const express = require('express');
const path = require('path');
const csv = require('csvtojson');
const csvPokemonPath = './data/pokemon.csv';

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/sample',  (req, res) => {
  res.json('all the pokemon');
});

// pokemon api
app.get('/api/pokemon', (req, res) => {
  csv().fromFile(csvPokemonPath).then((options) => {
    res.json(options);
  });
});

app.get('/api/pokemon/:pokemon', (req, res) => {
  if (req.params.pokemon) {
    console.log('load data for ' + req.params.pokemon);


  }
  // TODO: error handling :)
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`PokeCoach API listening on ${port}`);
