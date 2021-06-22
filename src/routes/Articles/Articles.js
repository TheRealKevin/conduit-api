const express = require('express');
const {getArticle, createArticle, deleteArticle, updateArticle, getAllArticles} = require('../../controllers/Articles/Articles');
const authByToken = require('../../middleware/auth');

const route = express.Router();

// POST REQ --> /articles                  CREATE ARTICLE

route.post('/',authByToken, async (req,res) => {
    try{
        // console.log('This is body ',req.body.article, ' and this is auth ',req.user);
        const newArticle = await createArticle(req.body.article,req.user.email);
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
        await deleteArticle(slug,req.user.email);
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
        const updatedArticle = await updateArticle(slug,req.user.email,req.body.article);
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

// route.get('/', async (req,res) => {
//     try{
//         const articles = await getAllArticles();
//         return res.status(200).json(articles);
//     }catch(err){
//         return res.status(500).json({
//             "errors" : {
//                 "body" : [err.message]
//             }
//         })
//     }
// })

// GET REQ --> /articles/feed              DISPLAYS ARTICLES BY FOLLOWED USERS IN RECENTLY ADDED ORDER

// POST REQ --> /articles/:slug/comments   ADDS A COMMENT

// GET REQ --> /articles/:slug/comments    GETS ALL COMMENTS

// DELETE REQ --> /articles/:slug/comments  DELETE A COMMENT

// POST REQ --> /articles/:slug/favorite   ADDS TO FAVORITES

// DELETE REQ --> /articles/:slug/favorite   DELETES FROM FAVORITES

module.exports = route;