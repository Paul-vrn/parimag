module.exports = (sequelize, DataTypes) => {
    const Livreur = sequelize.define("livreurs", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        nom:{
            type: DataTypes.STRING
        }
    }, {timestamps: false});
    return Livreur
}
