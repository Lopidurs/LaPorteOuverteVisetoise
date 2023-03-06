module.exports = (sequelize, DataTypes) => {

    const Games = sequelize.define("Games", {
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        MinPlayer: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        MaxPlayer: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Release: {
            type: DataTypes.DATE,
        },
        Status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Disponnible"
        },
        Description: {
            type: DataTypes.TEXT,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }

    })

    Games.associate = (models) => {
        Games.belongsToMany(models.Types, { through: 'Games_Types' }),

            Games.belongsToMany(models.KeyWords, { through: 'Games_KeyWords' }),

            Games.belongsToMany(models.Awards, { through: 'Games_Awards' })

    }
    return Games;
}