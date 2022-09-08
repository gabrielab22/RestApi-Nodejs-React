module.exports = (sequelize, DataTypes) => {
    const Korisnik = sequelize.define("Korisnik", {
        id_korisnika: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        administrator: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        iznajmljene: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    return Korisnik;
};