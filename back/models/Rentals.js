module.exports = (sequelize, DataTypes) => {

    const Rentals = sequelize.define("Rentals", {
        BeginRental: {
            type: DataTypes.DATE,
            allowNull: false
        },
        EndRental: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Return: {
            type: DataTypes.DATE
        },
        Comment: {
            type: DataTypes.STRING
        }
    })

    Rentals.associate = (models) => {
        Rentals.belongsTo(models.Users),
            Rentals.belongsTo(models.Games)
    }
    return Rentals;
}