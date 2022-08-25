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


    Autor.associate = models => {
        Autor.belongsTo(models.Knjiga);
    };
    return Autor;
};