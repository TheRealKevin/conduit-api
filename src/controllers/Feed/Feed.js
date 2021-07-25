const { Article } = require('../../entities/entities');

const getAuthors = async () => {

    const authors = await Article.aggregate('authorUsername', 'DISTINCT', { plain : false });
    // console.log(authors);
    return authors;
}

module.exports = { getAuthors };