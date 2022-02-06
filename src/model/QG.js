module.exports = (sequelize, DataTypes) => {
    const Qg = sequelize.define("QG", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
    }, {timestamps: false});
    return Qg
}
