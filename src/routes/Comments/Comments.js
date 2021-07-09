const express = require('express');
const { addComment, deleteComment, getComments } = require('../../controllers/Comments/Comments');
const authByToken = require('../../middleware/auth');

const route = express.Router();

// POST REQ --> /articles/:slug/comments   ADDS A COMMENT

route.post('/:slug/comments', authByToken, async (req,res) => {
    try{
        console.log('Comment is',req.user.username.username);
        const comment = await addComment(req.body.comment, req.params.slug, req.user.username.username);
        return res.status(200).json(comment);
    }catch(err){
        return res.status(500).json({
            "errors" : {
                "body" : [err.message]
            }
        })
    }
})

// DELETE REQ --> /articles/:slug/comments  DELETE A COMMENT

route.delete('/:slug/comments/:id', authByToken, async (req,res) => {
    const { slug, id } = req.params;
    try{
        console.log('username is',req.user.username);
        await deleteComment(slug, id, req.user.username);
        return res.status(200).json({ message : 'Comment deleted successfully'})
    }catch(err){
        return res.status(500).json({
            "errors" : {
                "body" : [err.message]
            }
        })
    }
})

// GET REQ --> /articles/:slug/comments    GETS ALL COMMENTS

route.get('/:slug/comments', async (req,res) => {
    const { slug } = req.params;
    try{   
        const comments = await getComments(slug);
        return res.status(200).json(comments);
    }catch(err){
        return res.status(500).json({
            "errors" : {
                "body" : [err.message]
            }
        })
    }
})

module.exports = route;