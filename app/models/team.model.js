module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define("team", {
        owner: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        pokemon: {
            type: Sequelize.STRING
        }
    });

    return Team;
};