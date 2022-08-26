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
        id_autora: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        godina_izdanja: {
            type: DataTypes.DATE,
            allowNull: false
        },
        id_zanra: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        dostupnost: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        zakasnina: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        datum_posudbe: {
            type: DataTypes.DATE,
            allowNull: false
        }

    });

    Knjiga.associate = models => {
        Knjiga.hasOne(models.Autor);
        Knjiga.hasOne(models.Zanr);
    };

    return Knjiga;
};