const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.delete('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            if (pokemon === null) {
                const message = 'Le pokemon demandé n\'existe pas';
                return res.status(404).json({message});
            }

            return Pokemon.destroy({
                where: { id: pokemon.id }
            })
            .then(_ => {
                const message = `Le pokémon avec l'identifiant n°${pokemon.id} a bien été supprimé.`
                res.json({message, data: pokemon })
            })
        })
        .catch(error => {
            const message = 'Erreur lors de la suppression du pokémon'
            res.status(500).json({message, data: {error}});
        })
    })
}