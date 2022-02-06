module.exports = (sequelize, DataTypes) => {
    const Produit = sequelize.define("produits", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        prix: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {timestamps:false});
    return Produit
}
