module.exports = (sequelize, DataTypes) => {
    const DetailCommande = sequelize.define("detail_commandes", {
        id_commande: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        id_produit:{
            type: DataTypes.INTEGER,
            primaryKey:true,
            allowNull: true
        },
        quantite:{
            type: DataTypes.INTEGER,
        }
    });
    return DetailCommande
}
