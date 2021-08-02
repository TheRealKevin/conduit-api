const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./src/entities/User/User');
const db = require('./src/config/Database');
const feedRoute = require('./src/routes/Feed/Feed');
const usersRoute = require('./src/routes/Users/Users');
const userRoute = require('./src/routes/User/User');
const articlesRoute = require('./src/routes/Articles/Articles');
const profilesRoute = require('./src/routes/Profiles/Profiles');
const commentsRoute = require('./src/routes/Comments/Comments');

const app = express();

app.use(cors());

app.use(bodyParser.json());

//  Routes

app.use('/api/feed', feedRoute);

app.use('/api/users', usersRoute);

app.use('/api/user', userRoute);

app.use('/api/articles', articlesRoute);

app.use('/api/profiles', profilesRoute);

app.use('/api/articles', commentsRoute);

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

const PORT = process.env.PORT || 3000;

app.listen(PORT , () => {
    console.log(`App is listening to ${PORT}`);
})