const Article = require('../../entities/Article/Article');

const getArticle = async(slug) => {
    if(!slug) throw new Error('No article found');
    const article = await Article.findOne({where : {slug : slug}});
    if(!article) throw new Error(`article doesn't exist`);
    return article;
}

module.exports = {getArticle};