module.exports = (sequelize, DataTypes) => {
    const DetailCommande = sequelize.define("detail_commandes", {
        quantite:{
            type: DataTypes.INTEGER,
        }
    }, {timestamps: false});
    return DetailCommande
}
