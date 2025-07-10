const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons/:id', (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then(pokemon => {
                let message = '';
                if (pokemon === null) {
                    message = `Le pokemon avec l'id ${req.params.id} n'existe pas.`
                    return res.status(404).json({message});
                }
                message = 'Un pokémon a bien été trouvé.'
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                const message = 'Erreur lors de la récupération du pokémon'
                res.status(500).json({message, data: {error}});
            })
    })
}