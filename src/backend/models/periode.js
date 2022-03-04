module.exports = (sequelize, DataTypes) => {
    const Periode = sequelize.define("periodes", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        start:{
            type: DataTypes.STRING,
            allowNull:false
        },
        end:{
            type: DataTypes.STRING,
            allowNull:false
        }
    }, {timestamps: false});
    return Periode
}
