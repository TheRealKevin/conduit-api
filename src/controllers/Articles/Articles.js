const { Article, User } = require('../../entities/entities');
const {Op} = require('sequelize');
const slugify = require('../../utils/Slugify/Slugify');
const { filterPassword } = require('../../utils/Password/Password');

//      Fixes
//  1. SQL commands running but author is not being updated in DB

const getArticle = async(slug) => {
    if(!slug) throw new Error('No article found');
    const article = await Article.findOne({
        attributes : [      // Attributes query the columns as asked for in the array
            "slug",
            "title",
            "description",
            "body",
            "createdAt",
            "updatedAt"
        ],
        where : {slug : slug},
        include : [        // Used for eager loading/querying another table's columns i.e
            {             // Getting the other tables columns
                attributes : ["username","bio","image"],
                model : User,
                as : "author",
            }
        ]  
    });
    if(!article) throw new Error(`Article doesn't exist`);
    return article;
}

const createArticle = async(article,email) => {
    if(!article.title) throw new Error('Title missing');
    if(!article.body) throw new Error('Body missing');
    // if(!article.username) throw new Error('Author missing');

    const existingArticle = await Article.findOne({where : {title: article.title}});
    if(existingArticle) throw new Error('Kindly change title of your article as another article with the similar title already exists');
    const existingUser = await User.findOne({where : {email : email}});
    
    // console.log('This is email given ',email);
    
    if(!existingUser) throw new Error('User does not exist');
    console.log(`This is existing User's email `,existingUser.email);
    console.log(`This is existing User`,existingUser);
    try{
        const _article = await Article.create({
            slug : slugify(article.title),
            body : article.body,
            title : article.title,
            description : article.description,
            authorEmail : existingUser.email
            // author : filterPassword(existingUser)
        })

        const newArticle = await Article.findOne({
            attributes : [
                "slug",
                "title",
                "description",
                "body",
                "createdAt",
                "updatedAt"
            ],
            where : { slug : _article.slug},
            include : [             
                {
                    attributes : ["username", "bio", "image"],
                    model : User,
                    as : "author",
                   where : {email : email}
                }
            ]
        });
        // console.log('Article created is',newArticle)
        return newArticle;
    }catch(err){
        throw err;
    }
}

const deleteArticle = async (slug,email) => {
    const article = await Article.findOne({where : {slug : slug}});
    if(!article) throw new Error('Article with such slug does not exist');
    try{
        const articleDeleted =  !!await Article.destroy({   // V.Imp 1. Using the !! Bang Bang Operator on the result of the await which will change the result into a Boolean
                    where : {[Op.and] : [  // V.Imp 2. Op -> short for operator and Op.and is equivalent of WHERE A AND B
                        {slug : slug},      // We use Op when we have to consider 2 or more conditions i.e when using "where" (as default is just comparing one value)
                        {authorEmail : email}
                    ]}
                }); 
        // console.log('Article deleted ',articleDeleted);
        if(!articleDeleted) throw new Error('Article was not able to be deleted'); 
        return articleDeleted;
    }catch(err){
        throw err;
    }
}

const updateArticle = async (slug,email,newArticle) => {
    try{
        const oldArticle = await Article.findOne({where : {slug : slug}});
        if(!oldArticle) throw new Error('Article with such title does not exist');

        let newSlug = newArticle.title ? await slugify(newArticle.title) : null;     // const requires initialization so using let
        // if(newArticle.title){                                                       // Checking if title has been changed, If yes then get new slug now 
        //     newSlug : await slugify(newArticle.title)                               // As can't be checked (we'll get error as if hasn't been changed/updated) when using update function below
        // }

        const updatedArticleTemp = await Article.update({
            slug : newSlug || slug,
            title : newArticle.title || oldArticle.title,
            description : newArticle.description || oldArticle.description,
            body : newArticle.body || oldArticle.body,
        },{
            where : {
                [Op.and] : [{slug : slug}, {authorEmail : email}]
            },
            returning: true,
            plain: true
        });

        if(!updatedArticleTemp) throw new Error('Article was not updated');

        const updatedArticle = await Article.findOne({where : {slug : newSlug || slug}});
        return updatedArticle;
    }catch(err){
        throw err;
    } 
}

const getAllArticles = async (req,res) => {
    const articles = await Article.findAll({
        attributes : [
            "slug",
            "title",
            "description",
            "body",
            "createdAt",
            "updatedAt"
        ],
        include : [
            {
                attributes : ["username", "bio", "image"],
                model : User,
                as: "author"
            }
        ]
    });
    return {
        articles,
        articlesCount : articles.length
    }
}

module.exports = {getArticle, createArticle, deleteArticle, updateArticle, getAllArticles};