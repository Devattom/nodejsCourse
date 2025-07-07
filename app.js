const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const { success } = require('./helper');

let pokemons = require('./mock-pokemon');

const app = express();
const port = 3000;

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'));

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

app.listen(port, () => console.log('Application démarée !'))