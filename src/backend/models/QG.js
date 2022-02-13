module.exports = (sequelize, DataTypes) => {
    const Qg = sequelize.define("QG", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        nom:{
            type: DataTypes.STRING
        },
        adresse:{
            type: DataTypes.STRING
        }
    }, {timestamps: false});
    return Qg
}
