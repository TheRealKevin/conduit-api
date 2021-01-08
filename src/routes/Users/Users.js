const express = require('express'); 
const db = require('../../config/Database');
const addUser = require('../../controllers/Users/Users')

const route = express.Router();

// POST REQ --> /users/             REGISTER NEW USER

route.post('/', (req,res) => {

})

// POST REQ --> /users/login        LOGIN

route.post('/login' , async (req,res) => {
    try{
        //console.log('In Routes '+ req);
        const newUser = await addUser({
            email: req.body.user.email,
            username : req.body.user.username
        })
        return res.send(newUser);
    }catch(err){
        console.error(err);
        return res.status(500).json({
            "errors": {
              "body": [
                "Could not login user"
              ]
            }
          })
    }
})

module.exports = route;