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
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    token: {
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
})

user.hasMany(article);

module.exports = user;