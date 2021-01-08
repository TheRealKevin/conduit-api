const {Sequelize,DataTypes} = require('sequelize');
const db = require('../../config/Database');

const article = require('../Article/Article');

const user = db.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    bio: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    freezeTableName: true
})

user.hasMany(article);

module.exports = user;