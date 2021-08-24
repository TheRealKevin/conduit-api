const {Sequelize} = require('sequelize');
const db = require('../../config/Database');

const Article = require('../Article/Article');

//  https://openclipart.org/download/247320/abstract-user-flat-4.svg

const User = db.define('User', {
    email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bio: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    token: {
        type: Sequelize.STRING
    }
},{
    freezeTableName: true
})

User.hasMany(Article);

module.exports = User;