module.exports = (sequelize, DataTypes) => {
    const Livreur = sequelize.define("livreurs", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        nom:{
            type: DataTypes.STRING
        },
        disponible:{
            type: DataTypes.BOOLEAN,
            allowNull:false
        }
    }, {timestamps: false});
    return Livreur
}
