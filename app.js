const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const parser = require('body-parser');
const sequelize = require('./src/db/sequelize');

const app = express();
const port = 3000;


app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(parser.json());

sequelize.initDb();

require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPK')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);

app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée.';
    res.status(404).json({message});
})
app.listen(port, () => console.log('Application démarée !'))