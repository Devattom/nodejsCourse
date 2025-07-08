const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const { Sequelize } = require('sequelize');
const { success } = require('./helper');
const parser = require('body-parser');
const { success, getUniqueId } = require('./helper');

let pokemons = require('./mock-pokemon');

const app = express();
const port = 3000;

const sequelize = new Sequelize(
    'nodeCourse',
    'root',
    'root',
    {
        host: 'localhost',
        dialect: 'mariadb',
        dialectOptions: {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)

sequelize.authenticate()
    .then(_ => console.log('La connexion à la BDD a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la bdd ${error}`))

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(parser.json());

app.get('/', (req,res) => res.send('Hello Express 2'));

app.get('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    const message = 'Un pokemon a bien été trouvé';
    res.json(success(message, pokemon));
});

app.get('/api/pokemons', (req,res) => {
    const message = 'Liste des pokemons'
    res.json(success(message, pokemons));
})

app.post('/api/pokemons', (req,res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = {...req.body, ...{id: id, created: new Date()}};
    pokemons.push(pokemonCreated);
    const message = `Le pokémon ${pokemonCreated.name} a bien été crée`;
    res.json(success(message, pokemonCreated));
})

app.put('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id};
    const indexToUpdate = pokemons.findIndex(pokemon => pokemon.id === id);
    pokemons[indexToUpdate] = pokemonUpdated;
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié`;
    res.json(success(message, pokemonUpdated));
})

app.delete('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id);
    pokemons = pokemons.filter(pokemon => pokemon.id !== id);
    const message = `Le pokémone ${pokemonDeleted.name} a bien été supprimé`;
    res.json(success(message, pokemonDeleted));
})
app.listen(port, () => console.log('Application démarée !'))