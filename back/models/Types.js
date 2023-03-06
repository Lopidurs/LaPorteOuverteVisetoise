module.exports = (sequelize, DataTypes) => {

    const Types = sequelize.define("Types", {
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    
    Types.associate = (models) => {
        Types.belongsToMany(models.Games, {through: 'Games_Types'})
        
     }

    return Types;
}