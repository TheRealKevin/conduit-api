const {Sequelize} = require('sequelize');

const db = new Sequelize('conduit','postgres','nasirpur', {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log
});

module.exports = db;