const { Sequelize } = require('sequelize');
const db = require('../../config/Database');

const User = require('../User/User');

// // //      TODO
// // //  1. add "favorited", "favoritesCount" and "author" to the entity
// // //  2. Error: article.belongsTo called with something that's not a subclass of Sequelize.Mode

const Article = db.define('Article', {
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
        type: Sequelize.TEXT,
        allowNull : false
    },
    createdAt : {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt : {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    favorited : {
        type : Sequelize.BOOLEAN,
        defaultValue: false
    },
    favoritesCount : {
        type : Sequelize.INTEGER,
        defaultValue : 0
    }
},{
    freezeTableName: true
})

// Article.belongsTo(User);

module.exports = Article; 
