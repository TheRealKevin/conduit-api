const {Sequelize} = require('sequelize');

const db = new Sequelize('conduit','postgres','nasirpur', {
    host: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: console.log,
    ssl : true
});

module.exports = db;