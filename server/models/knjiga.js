module.exports = (sequelize, DataTypes) => {
    const Knjiga = sequelize.define("Knjiga", {
        id_knjige: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false
        },
        naziv_knjige: {
            type: DataTypes.STRING,
            allowNull: false
        },
        godina_izdanja: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dostupnost: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        dostupna_za: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        count_iznajmljena:{
            type: DataTypes.INTEGER,
            allowNull:true
        },
        knjigu_posudio: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Knjiga;
};