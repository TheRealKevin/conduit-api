const {Sequelize, DataTypes} = require('sequelize');
const db = require('../../config/Database');

const user = require('../User/User');

const article = db.define('Article', {
    slug : {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    title : {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    description : {
        type: Sequelize.STRING(100)
    },
    body : {
        type: Sequelize.STRING
    },
    createdAt : {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt : {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW
    }
},{
    freezeTableName: true
})

// Article.belongsTo(User);

module.exports = article; 