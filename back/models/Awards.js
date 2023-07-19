module.exports = (sequelize, DataType) => {

    const Awards = sequelize.define("Awards", {
        Name: {
            type: DataType.STRING,
            allowNull: false,
            unique: true
        }
    })

    Awards.associate = (models) => {
        Awards.belongsToMany(models.Games, { through: 'Games_Awards' })
    }
    return Awards;
}