const express = require('express');
const path = require('path');
const csv = require('csvtojson');
const csvPokemonPath = './data/pokemon.csv';
const Pokedex = require('pokedex-promise-v2');

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
    let pokemon = req.params.pokemon.toLowerCase();
    let name;
    let spriteUrl;
    let types;
    let weaknesses = [];

    P.getPokemonByName(pokemon) // with Promise
        .then(function(response) {
          // grab details required...
          if (response.name) {
            name = response.name;
          }

          if (response.sprites && response.sprites.front_default) {
            spriteUrl = response.sprites.front_default;
          }

          if (response.types) {
            types = response.types.map(x => x.type.name)
          }

          // grab weaknesses across types
          P.getTypeByName(types)
              .then(function(response) {
                weaknesses = response.map(x => x.damage_relations.double_damage_from).flat(1).map(x => x.name);

                let pokemonData = {
                  name,
                  spriteUrl,
                  types,
                  weaknesses
                };

                console.log(JSON.stringify(pokemonData));
                res.json(pokemonData);
              })
              .catch(function(error) {
                console.log('There was an ERROR: ', error);
              });
        })
        .catch(function(error) {
          // TODO: error handling :)
          console.log('There was an ERROR: ', error);
        });
  }
});

app.get('/api/pokemon/type/:type', (req, res) => {
  if (req.params.type) {
    let type = req.params.type;
    let weaknesses = [];

    // load type details with type
    P.getTypeByName(type)
        .then(function(response) {
          weaknesses = response.map(x => x.damage_relations.double_damage_from).flat(1).map(x => x.name);

          res.json(weaknesses);
        })
        .catch(function(error) {
          // TODO: error handling :)
          console.log('There was an ERROR: ', error);
        });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

const P = new Pokedex();

console.log(`PokeCoach API listening on ${port}`);
