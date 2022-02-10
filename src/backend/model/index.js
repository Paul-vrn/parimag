const {Sequelize, DataTypes} = require("sequelize");


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: require('../config').dbPath,
    logging: false,

});

const db = {};

db.Livreur = require('./livreur')(sequelize, DataTypes);
db.Qg = require('./QG')(sequelize, DataTypes);
db.Produit = require('./produit')(sequelize, DataTypes);
db.Commande = require('./commande')(sequelize, DataTypes);
db.DetailCommande = require('./detail_commande')(sequelize, DataTypes);
db.Stock = require('./stock')(sequelize, DataTypes);

db.Livreur.belongsTo(db.Qg) // QG_id dans Livreur
db.DetailCommande.belongsTo(db.Commande) 
db.DetailCommande.belongsTo(db.Produit)
db.Stock.belongsTo(db.Produit)
db.Stock.belongsTo(db.Qg)
db.Commande.belongsTo(db.Qg)
/*
db.Produit.hasMany(db.DetailCommande, {foreignKey:'produitId'})
db.DetailCommande.belongsTo(db.Produit, {targetKey:'produitId'})
db.Commande.hasMany(db.DetailCommande, {foreignKey: 'commandeId'})
db.DetailCommande.belongsTo(db.Commande, {targetKey:'commandeId'})

db.Produit.hasMany(db.Stock, {foreignKey:'produitId'})
db.Stock.belongsTo(db.Produit)

//db.Qg.hasMany(db.Stock, {foreignKey:'y'})
db.Stock.belongsTo(db.Qg)

//db.Qg.hasMany(db.Livreur, {foreignKey:'qgId'})
db.Livreur.belongsTo(db.Qg)
*/


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
