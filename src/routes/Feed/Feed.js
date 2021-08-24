const express = require('express');
const { getAuthors } = require('../../controllers/Feed/Feed');

const route = express.Router();

// POST REQ --> /feed                  GET ALL AUTHORS

route.get('/', async (req,res) => {
    try{
        const authors = await getAuthors();
        return res.status(200).json(authors);
    }catch(err){
        return res.status(422).json({
            "errors" : {
                "body" : [err.message]
            }
        })
    }
})

module.exports = route;
