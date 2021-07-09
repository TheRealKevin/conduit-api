const { Sequelize, DATE } = require('sequelize');
const db = require('../config/Database');

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

const User = db.define('User', {
    email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true
    },
    username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        primaryKey: true,
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

User.hasMany(Article, {as: "author"});
Article.belongsTo(User, {as : "author"});

const Comment = db.define('Comment', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        unique : true,
        allowNull : false
    },
    createdAt : {
        type : Sequelize.DATE,
        defaultValue : DATE.NOW,
        allowNull: false,
    },
    updatedAt : {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    body : {
        type : Sequelize.TEXT,
        allowNull : false
    }
},{
    freezeTableName : true
})

Article.hasMany(Comment)
Comment.belongsTo(Article);

User.hasMany(Comment)
Comment.belongsTo(User, {as: "author"});

module.exports = { Article, User, Comment};