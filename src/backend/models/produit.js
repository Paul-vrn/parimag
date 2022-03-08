module.exports = (sequelize, DataTypes) => {
    const Produit = sequelize.define("produits", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nom:{
            type: DataTypes.STRING,
            unique:true,
            allowNull:false
        },
        plat_du_jour:{
            type:DataTypes.DATEONLY,
            allowNull:true
        },
        type:{
            type: DataTypes.ENUM('Service', 'Plat', 'Entree', 'Dessert', 'Boisson'),
            allowNull: false
        },
        prix: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        ingredients:{
            type:DataTypes.STRING,
            allowNull:true
        },
        vege:{
            type:DataTypes.BOOLEAN,
            allowNull:true
        },
        halal:{
            type:DataTypes.BOOLEAN,
            allowNull:true
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        photo:{
            type: DataTypes.STRING,
            allowNull:false
        },
        quantiteMax:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        sous_titre:{
            type: DataTypes.STRING,
            allowNull:true
        }

    }, {timestamps:false});
    return Produit
}
