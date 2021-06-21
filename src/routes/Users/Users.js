const express = require('express'); 
const {addUser,loginUser} = require('../../controllers/Users/Users')

const route = express.Router();

// POST REQ --> /users/             REGISTER NEW USER
 
route.post('/', async (req,res) => { 
    try{
        //console.log('In Routes '+ req);
        const newUser = await addUser({
            email: req.body.user.email,
            username : req.body.user.username,
            password: req.body.user.password
        })
        return res.send(newUser);
    }catch(err){
        console.error(err);
        return res.status(500).json({
                "errors": {
                    "body": [err.message]
            }
        })
    }
})

// POST REQ --> /users/login        LOGIN

route.post('/login' , async (req,res) => {
    //console.log('------------------------In login route ',req.body);
    try{
        const user = await loginUser(req.body.user);
        return res.status(200).json({user});
    }catch(err){
        console.error(err);
        return res.status(400).json({
            "errors": {
                "body" : [err.message]
            }
        })
    }
})

module.exports = route;