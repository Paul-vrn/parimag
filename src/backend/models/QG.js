module.exports = (sequelize, DataTypes) => {
    const Qg = sequelize.define("QG", {
        nom:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull:true
        },
        adresse:{
            type: DataTypes.STRING,
            //allowNull:false
        },
        place_id:{
            type: DataTypes.STRING,
            //allowNull:false
        },
        password:{
            type: DataTypes.STRING,
            //allowNull:false
        }
    }, {timestamps: false});
    return Qg
}
