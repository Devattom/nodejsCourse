/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée'];

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom est déja pris'
            },
            validate: {
                notEmpty: {msg: 'Le nom est requis'},
                notNull: {msg: 'Le nom est requis'}
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utiliser uniquement des nombres entiers pour les hp.'},
                notNull: {msg: 'Les points de vie sont requis'},
                min: {
                    args: [0],
                    msg: 'La valeur des hp doit être comprise entre 0 et 99'
                },
                max: {
                    args: [999],
                    msg: 'La valeur des hp doit être comprise entre 0 et 999'
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: 'Utiliser uniquement des nombres entiers pour les cp.'},
                notNull: {msg: 'Les cp sont requis'},
                min: {
                    args: [0],
                    msg: 'La valeur des cp doit être comprise entre 0 et 99'
                },
                max: {
                    args: [99],
                    msg: 'La valeur des cp doit être comprise entre 0 et 99'
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {msg: 'Utiliser une URL valide pour l\'image.'},
                notNull: {msg: 'L\'image est requise'}
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                isTypesValid(value) {
                    if (!value) {
                        throw new Error('Au moins un type est requis')
                    }
                    if (value.split(',').length > 3) {
                        throw new Error('Le nombre de types max est 3')
                    }
                    value.split(',').forEach(type => {
                        if (!validTypes.includes(type)) {
                            throw new Error(`Le type doit appartenir à la liste : ${validTypes}`)
                        }
                    })
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}