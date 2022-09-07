module.exports = (sequelize, DataTypes) => {
    const Autor = sequelize.define("Autor", {
        id_autora: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false
        },
        naziv_autora: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });


    Autor.associate = (models) => {
        Autor.hasMany(models.Knjiga,{
        onDelete: "cascade", //ako izbrisemo autora, izbrisi sve knjige vezane za njega
    });
    };
    return Autor;
};