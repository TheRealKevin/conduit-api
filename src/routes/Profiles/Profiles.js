const express = require('express');
const { getProfile } = require('../../controllers/Profiles/Profiles');
const authByToken = require('../../middleware/auth');

const route = express.Router();

//      FIXES

//  1. Fix "User was not found" error 

// GET REQ --> /profiles/:username             GET PROFILE

route.get('/:username' , async (req,res) => {
    try{
        const username = req.params.username;
        const profile = await getProfile(username);
        return res.status(200).json(profile);
    }catch(err){
        return res.status(404).json({
            "errors" : {
                message : [err.message]
            }
        })
    }
})

// POST REQ --> /profiles/:username/follow      FOLLOW USER

// route.post('/:username/follow', authByToken, async (req,res) => {
//     const username = req.params.username.toLowerCase();
//     try{
//         const profile = await followUser(req.user.username,username);
//         return res.status(200).json(profile);
//     }catch(err){

//     }
// })

module.exports = route;