const express = require('express');
let pokemons = require('./mock-pokemon');

const app = express();
const port = 3000;

app.get('/', (req,res) => res.send('Hello Express 2'));

app.get('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    res.send(`Vous avez demandé le pokémon ${pokemon.name} !`)
});

app.get('/api/pokemons', (req,res) => {
    const totalPokemons = pokemons.length;
    res.send(`Il y a ${totalPokemons} pokemons dans le pokedex pour le moment`)
})

app.listen(port, () => console.log('Application démarée !'))