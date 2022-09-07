module.exports = (sequelize, DataTypes) => {
    const Zanr = sequelize.define("Zanr", {
        id_zanra: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false
        },
        naziv_zanra: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });


    Zanr.associate = (models) => {
        Zanr.hasMany(models.Knjiga, {
            onDelete: "cascade", //ako izbrisemo zanr, izbrisi sve knjige vezane za njega
        });
    };
    return Zanr;
};