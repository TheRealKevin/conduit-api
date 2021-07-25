const express = require('express');
const {getArticle, createArticle, deleteArticle, updateArticle, getAllArticles} = require('../../controllers/Articles/Articles');
const authByToken = require('../../middleware/auth');

const route = express.Router();

// POST REQ --> /articles                  CREATE ARTICLE

route.post('/', authByToken, async (req,res) => {
    try{
        const newArticle = await createArticle(req.body.article,req.user.username); 
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

// DELETE REQ --> /articles/:slug          DELETES AN ARTICLE

route.delete('/:slug', authByToken, async (req,res) => {
    try{
        const slug = req.params.slug;
        await deleteArticle(slug,req.user.username.username);     // Dky auth.js is giving req.user.username.username instead of req.user.username   
        return res.status(200).json({ message : 'Article deleted successfully'})
    }catch(err){
        return res.status(500).json({
            "errors" : {
                "body" : [err.message]
            }
        })
    }
})

// PATCH REQ --> /articles/:slug             UPDATES AN ARTICLE

route.patch('/:slug', authByToken, async (req,res) => {
    try{
        const slug = req.params.slug;
        const updatedArticle = await updateArticle(slug,req.user.username,req.body.article);
        return res.status(200).json(updatedArticle);
    }catch(err){
        return res.status(500).json({
            "errors" : {
                "body" : [err.message]
            }
        })
    }
})

// GET REQ --> /articles                   LIST ALL ARTICLES

route.get('/', async (req,res) => {
    try{
        const username = req.query.username;
        const articles = await getAllArticles(username);
        return res.status(200).json(articles);
    }catch(err){
        return res.status(500).json({
            "errors" : {
                "body" : [err.message]
            }
        })
    }
})

// GET REQ --> /articles/feed              DISPLAYS ARTICLES BY FOLLOWED USERS IN RECENTLY ADDED ORDER

// POST REQ --> /articles/:slug/favorite   ADDS TO FAVORITES

// DELETE REQ --> /articles/:slug/favorite   DELETES FROM FAVORITES

module.exports = route;