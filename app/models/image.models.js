const { sequelize } = require(".");
const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
        type: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        data: {
            type: DataTypes.BLOB("long"),
        },
    });

    return Image;
}