module.exports = (sequelize, DataKeyWords) => {

    const KeyWords = sequelize.define("KeyWords", {
        Name: {
            type: DataKeyWords.STRING,
            allowNull: false,
            unique: true
        }
    })

    KeyWords.associate = (models) => {
        KeyWords.belongsToMany(models.Games, { through: 'Games_KeyWords' })
    }

    return KeyWords;
}