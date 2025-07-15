const { Pokemon } = require('../db/sequelize')
const {ValidationError, UniqueConstraintError} = require("sequelize");

module.exports = (app) => {
    app.put('/api/pokemons/:id', (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: { id: id }
        })
        .then(_ => {
            return Pokemon.findByPk(id).then(pokemon => {
                let message = '';
                if (pokemon === null) {
                    message = 'Le pokemon demandé n\'existe pas'
                    return res.status(404).json({message});
                }
                message = `Le pokémon ${pokemon.name} a bien été modifié.`
                res.json({message, data: pokemon })
            })
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({message: error.message})
            }
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({message: error.message})
            }
            const message = 'Erreur lors de la modification du pokémon'
            res.status(500).json({message, data: {error}});
        })
    })
}