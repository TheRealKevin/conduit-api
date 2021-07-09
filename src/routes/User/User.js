const express = require('express');
const { getUserByEmail, updateUser} = require('../../controllers/User/User'); 
const authByToken = require('../../middleware/auth');

const route = express.Router();

// GET REQ --> /user/             GET CURRENT USER

route.get('/', authByToken, async(req,res) => {
    try{        // Checking whether authByToken updated req with user
        const user = await getUserByEmail(req.user.email)
        if(!user) throw new Error('No such user found');
        return res.status(200).json(user);
    }catch(err){
        return res.status(404).json({
            errors: {body : [err.message]}
        })
    }
})

// PATCH REQ --> /users/             UPDATE CURRENT USER

route.patch('/', authByToken, async(req,res) => {
    try{
        console.log('In user route, patch req is',req.user);
        const updatedUser = await updateUser(req.user,req.body.user);   // req.user -> OG user retrieved by authByToken
                                                                        // req.body.user -> The new info that user is sending
        if(!updatedUser) throw new Error('User could not be updated');
        return res.status(200).json(updatedUser);
    }catch(err){                                                       
        return res.status(404).json({
            errors : { body : [err.message]}
        })
    }
})

module.exports = route;