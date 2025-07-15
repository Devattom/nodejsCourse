const { Pokemon } = require('../db/sequelize')
const {ValidationError, UniqueConstraintError} = require("sequelize");

module.exports = (app) => {
    app.post('/api/pokemons', (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `Le pokémon ${req.body.name} a bien été crée.`
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                if (error instanceof ValidationError) {
                    return res.status(400).json({message: error.message});
                }
                if (error instanceof UniqueConstraintError) {
                    return res.status(400).json({message: error.message})
                }
                const message = 'Erreur lors de la création du pokémon'
                res.status(500).json({message, data: {error}});
            })
    })
}