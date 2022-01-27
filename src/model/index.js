const {Sequelize, DataTypes} = require("sequelize");


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: require('../config').dbPath,
    logging: false,

});

const db = {};

db.User = require('./user')(sequelize,DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
