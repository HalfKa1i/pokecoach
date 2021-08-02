const csv = require('csvtojson');
const csvPokemonPath = './data/pokemon.csv';
const Pokedex = require('pokedex-promise-v2');

const P = new Pokedex();

// Retrieve all pokemon from the database
exports.findAll = (req, res) => {
    csv().fromFile(csvPokemonPath).then((options) => {
        res.json(options);
    });
};

// Find a single pokemon
exports.findOne = (req, res) => {
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
};

// Find a pokemon by type
exports.findByType = (req, res) => {
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
};