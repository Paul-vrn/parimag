module.exports = (sequelize, DataTypes) => {
    const Livreur = sequelize.define("livreurs", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
    }, {timestamps: false});
    return Livreur
}
