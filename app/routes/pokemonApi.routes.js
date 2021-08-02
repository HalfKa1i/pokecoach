module.exports = app => {
    const pokemon = require("../controllers/pokemon.controller.js");

    var router = require("express").Router();

    // Retrieve all Pokemon
    router.get("/", pokemon.findAll);

    // Retrieve a single Pokemon
    router.get("/:pokemon", pokemon.findOne);

    // Retrieve Pokemon by type
    router.get("/type/:type", pokemon.findByType);

    app.use('/api/pokemon', router);
};