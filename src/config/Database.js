const {Sequelize} = require('sequelize');

const db = new Sequelize('postgres://phifszhzzaespv:54341b915d05427f512097579120e636be7d7bf3b8d8206608e4acabf7340570@ec2-44-197-40-76.compute-1.amazonaws.com:5432/d8epopjk0mtlla')

// const db = new Sequelize('conduit','postgres','nasirpur', {
//     host: 'localhost',
//     dialect: 'postgres',
//     logging: console.log
// });

module.exports = db;