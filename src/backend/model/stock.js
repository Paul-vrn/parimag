module.exports = (sequelize, DataTypes) => {
    const Stocks = sequelize.define("stocks", {
        quantite: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    }, {timestamps: false});
    return Stocks
}
