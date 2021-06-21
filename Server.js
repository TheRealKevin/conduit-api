const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./src/entities/User/User');
const db = require('./src/config/Database');
const usersRoute = require('./src/routes/Users/Users');
const userRoute = require('./src/routes/User/User');
const articlesRoute = require('./src/routes/Articles/Articles');

const app = express();
app.use(bodyParser.json());

//  Routes

app.use('/api/users',usersRoute);

app.use('/api/user',userRoute);

app.use('/api/articles',articlesRoute);

// REQUESTS

app.get('/', async (req,res) => {
    res.json('Yooooooooooo')
    try {
        await db.authenticate();
        console.log('Connection has been established');
    } catch(err) {
        console.log('Error');
    }
})

// To START sequelize and also wipes the DB clean

// async function main() {
//     await sequelize.sync({force: true})
// }

// main()

// TO START sequelize 
 
app.listen(3000 , () => {
    console.log('App is listening to 3000');
})