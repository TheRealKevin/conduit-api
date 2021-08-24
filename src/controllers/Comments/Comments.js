const { Article, Comment, User } = require('../../entities/entities');
const { Op } = require('sequelize');

//      FIXES
//  1. ArticleSlug is not added in db

const addComment = async ( _comment, slug, username ) => {
    if(!_comment.body) throw new Error('Comment has been left empty');
    const article = Article.findOne({where : {slug : slug}});
    if(!article) throw new Error('No such article found');
    try{
        const comment = await Comment.create({
            body : _comment.body,
            authorUsername : username,
            ArticleSlug : slug
        })

        const newComment = await Comment.findOne({
            attributes : [
                "id",
                "body",
                "createdAt",
                "updatedAt"
            ],
            where : { id : comment.id },
            include : [
                {
                    attributes : ["username", "bio", "image", "token"],
                    model : User,
                    as : "author",
                    where : {username : username}
                }
            ]
        });

        // console.log('Comment is',newComment)

        return newComment;
    }catch(err){
        throw err;
    }
}

const deleteComment = async ( slug, id, username ) => {
    if(!slug) throw new Error('Title is missing');
    if(!id) throw new Error('Comment ID is missing');
    if(!username) throw new Error('Username is missing');

    const article = await Article.findOne({ where : {slug : slug}});
    if(!article) throw new Error('Article does not exist');

    // console.log('In Comment controller, article is',article);

    try{
        const deletedComment = await Comment.destroy({
            where : {           // username also used as only the comment author can delete his/her comment
                [Op.and] : [ {id : id}, {ArticleSlug : slug}, {authorUsername : username}]
            }
        })

        console.log('deletedComment is',deletedComment)

        if(!deletedComment) throw new Error('Comment was not able to be deleted'); 
        return deletedComment;
    }catch(err){
        throw err;
    }
}

const getComments = async (slug) => {
    if(!slug) throw new Error('Title is missing');
    try{
        const comments = await Comment.findAll({
            attributes : [
                "id",
                "body",
                "createdAt",
                "authorUsername"
            ],
            where : {ArticleSlug : slug},
            include : [
                {
                    attributes : ["username", "bio", "image", "token"],
                    model : User,
                    as : "author"
                }
            ]
        });
        
        if(!comments) throw new Error(`Comments for the article weren't able to be fetched`);

        return comments;
    }catch(err){
        throw err;
    }
}

module.exports = { addComment, deleteComment, getComments };