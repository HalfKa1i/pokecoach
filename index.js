const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// Put all API endpoints under '/api'
app.get('/api/sample',  (req, res) => {
  res.json('all the pokemon');
});

require("./app/routes/pokemonApi.routes")(app);
require("./app/routes/team.routes")(app);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`PokeCoach API listening on ${port}`);
