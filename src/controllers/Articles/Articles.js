const Article = require('../../entities/Article/Article');
const User = require('../../entities/User/User');
const slugify = require('../../utils/Slugify/Slugify');
const { filterPassword } = require('../../utils/Password/Password');

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
                as : "author"
            }
        ]  
    });
    if(!article) throw new Error(`Article doesn't exist`);
    return article;
}

const createArticle = async(data) => {
    if(!data.title) throw new Error('Title missing');
    if(!data.body) throw new Error('Body missing');
    if(!data.username) throw new Error('Author missing');

    const Article = await Article.findOne({where : {title: data.title}});
    const User = await User.findOne({where : {email : data.user.email}});
    if(!User) throw new Error('User does not exist');
    if(Article) throw new Error('Kindly change title of your article as another article with the similar title already exists')
    try{
        const newArticle = await Article.create({
            slug : slugify(data.title),
            body : data.body,
            title : data.title,
            description : data.description,
            author : filterPassword(data.user)
        })
        return newArticle
    }catch(err){
        throw err;
    }
}

module.exports = {getArticle,createArticle};