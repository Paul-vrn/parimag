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

db.Livreur.belongsTo(db.Qg, {foreignKey:{allowNull:false}}) // QG_id dans Livreur
db.Commande.hasMany(db.DetailCommande)
db.DetailCommande.belongsTo(db.Commande, {foreignKey:{allowNull:false}, onDelete:'CASCADE'})
db.DetailCommande.belongsTo(db.Produit, {foreignKey:{allowNull:false}})

db.Produit.hasMany(db.Stock)
db.Stock.belongsTo(db.Produit, {foreignKey:{allowNull:false}})

db.Qg.hasMany(db.Stock)
db.Stock.belongsTo(db.Qg, {foreignKey:{allowNull:false}})

db.Commande.belongsTo(db.Qg, {foreignKey:{allowNull:false}})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
