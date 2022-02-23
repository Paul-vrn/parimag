module.exports = (sequelize, DataTypes) => {
    const Banderole = sequelize.define("banderole", {
        message:{
            type: DataTypes.INTEGER,
        }
    }, {timestamps: false});
    return Banderole
}
