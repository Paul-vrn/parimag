module.exports = (sequelize, DataTypes) => {
    const Livreur = sequelize.define("livreurs", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        disponible:{
            type: DataTypes.INTEGER
        }
    }, {timestamps: false});
    return Livreur
}
