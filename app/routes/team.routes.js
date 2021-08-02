module.exports = app => {
    const teams = require("../controllers/team.controller.js");

    var router = require("express").Router();

    // Create a new Team
    router.post("/", teams.create);

    // Retrieve all Teams
    router.get("/", teams.findAll);

    // Retrieve all Teams
    router.get("/:name", teams.findAllByName);

    // Retrieve all owned Teams
    router.get("/owned/:owner", teams.findAllByOwner);

    // Retrieve all favourited Teams
    router.get("/favourite/:owner", teams.findOwnerFavourite);

    // Retrieve a single Team with id
    router.get("/:id", teams.findOne);

    // Update a Team with id
    router.put("/:id", teams.update);

    // Delete a Team with id
    router.delete("/:id", teams.delete);

    // Delete all Team
    router.delete("/", teams.deleteAll);

    app.use('/api/teams', router);
};