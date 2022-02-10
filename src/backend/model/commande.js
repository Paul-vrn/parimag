module.exports = (sequelize, DataTypes) => {
    const Commande = sequelize.define("commandes", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        adresse: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        etat: {
            type: DataTypes.ENUM(
                "en attente de payement",
                "en cuisine",
                "en cours de livraison",
                "livrée"
                ),
            allowNull: false
        }
    });
    return Commande
}
