const { Article, User } = require('../../entities/entities')
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

module.exports = {getArticle,createArticle};