const express = require('express');
const db = require('../../config/Database');
const {getArticle} = require('../../controllers/Articles/Articles')

const route = express.Router();

// GET REQ --> /articles/feed              DISPLAYS ARTICLES BY FOLLOWED USERS IN RECENTLY ADDED ORDER

// GET REQ --> /articles/:slug             GET ARTICLE

route.get('/', async (req,res) => {
    try{
        const article = await getArticle({
            slug : req.body.slug
        })
        return res.json(article);
    }catch(err){
        console.log(err);
        return res.status(500).json({
            "errors" : {
                "body" : [err.message]
            } 
        })
    }
})

// PUT REQ --> /articles/:slug             UPDATES AN ARTICLE

// DELETE REQ --> /articles/:slug          DELETES AN ARTICLE

// POST REQ --> /articles/:slug/comments   ADDS A COMMENT

// GET REQ --> /articles/:slug/comments    GETS ALL COMMENTS

// DELETE REQ --> /articles/:slug/comments   

// POST REQ --> /articles/:slug/favorite   ADDS TO FAVORITES

// DELETE REQ --> /articles/:slug/favorite   DELETES FROM FAVORITES

module.exports = route;