const express = require('express');
const db = require('../../config/Database');
const {getArticle,createArticle} = require('../../controllers/Articles/Articles');
const authByToken = require('../../middleware/auth');

const slugify = require('../../utils/Slugify/Slugify');

const route = express.Router();

// POST REQ --> /articles                  CREATE ARTICLE

route.post('/',authByToken, async (req,res) => {
    try{
        const {article,user} = req.body;
        const newArticle = await createArticle({
            title : article.title,
            description : article.description,
            body : article.body,
            user : user         // This is the author of the article
        })
        return res.send(newArticle)
    }catch(err){
        console.log(err);
        return res.status(500).json({
            "errors": {
                "body": [err.message]
            }
        })
    }
})

// GET REQ --> /articles/:slug             GET ARTICLE

route.get('/:slug', async (req,res) => {
    try{
        const article = await getArticle(req.params.slug)
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

// GET REQ --> /articles/feed              DISPLAYS ARTICLES BY FOLLOWED USERS IN RECENTLY ADDED ORDER

// PUT REQ --> /articles/:slug             UPDATES AN ARTICLE

// DELETE REQ --> /articles/:slug          DELETES AN ARTICLE

// POST REQ --> /articles/:slug/comments   ADDS A COMMENT

// GET REQ --> /articles/:slug/comments    GETS ALL COMMENTS

// DELETE REQ --> /articles/:slug/comments   

// POST REQ --> /articles/:slug/favorite   ADDS TO FAVORITES

// DELETE REQ --> /articles/:slug/favorite   DELETES FROM FAVORITES

module.exports = route;