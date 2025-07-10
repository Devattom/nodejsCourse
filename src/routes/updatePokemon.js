const { Pokemon } = require('../db/sequelize')

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
            const message = 'Erreur lors de la modification du pokémon'
            res.status(500).json({message, data: {error}});
        })
    })
}