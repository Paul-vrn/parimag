module.exports = (sequelize, DataTypes) => {
    const Commande = sequelize.define("commandes", {
        code: {
            type: DataTypes.STRING,
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
            /**
             * EAP : en attente de payement
             * EC : en cuisine
             * LV : livrée
             * ECL : en cours de livraison
             */
            type: DataTypes.ENUM("EAP", "EC", "LV", "ECL"),
            allowNull: false
        }
    });
    return Commande
}
