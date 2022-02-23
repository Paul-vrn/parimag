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
             * EC : commande prise en charge
             * LV : livrée
             */
            type: DataTypes.ENUM,
            values:["EAP", "CPC", "LV"],
            allowNull: false
        },
        commentaire:{
            type: DataTypes.STRING,
            allowNull:true
        }
    });
    return Commande
}
