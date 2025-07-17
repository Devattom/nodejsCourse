const {Pokemon} = require('../db/sequelize');
const {Op} = require('sequelize');

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        if (req.query.name) {
            const name = req.query.name;
            if (name.length <= 1) {
                const message = 'Merci de saisir au moins 2 lettres pour votre recherche'
                return res.status(400).json({message})
            }

            const limit = parseInt(req.query.limit) || 5;
            return Pokemon.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                },
                limit: limit,
                order: ['name']
            })
                .then(({count, rows}) => {
                    const message = `Il y a ${count} pokémons qui correspondent au terme de recherche ${name}`
                    res.json({message, data: rows})
                })
        }

        Pokemon.findAll({order: ['name']})
            .then(pokemons => {
                const message = 'La liste des pokémons a bien été récupérée.'
                res.json({message, data: pokemons})
            })
            .catch(error => {
                const message = `La liste des pokémons n'a âs pu être récupérée.`
                res.status(500).json({message, data: error})
            })
    })
}