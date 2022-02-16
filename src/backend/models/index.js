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

db.Livreur.belongsTo(db.Qg, {allowNull:false}) // QG_id dans Livreur
db.DetailCommande.belongsTo(db.Commande, {foreignKey:{name:"commandeId"}, allowNull:false})
db.DetailCommande.belongsTo(db.Produit, {allowNull:false})
db.Stock.belongsTo(db.Produit, {allowNull:false})
db.Stock.belongsTo(db.Qg, {allowNull:false})
db.Commande.belongsTo(db.Qg, {allowNull:false})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
