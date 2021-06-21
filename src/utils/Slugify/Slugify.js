const slugify = (title) => {
    const slug = title.toLowerCase().split(' ').join('-');
    // console.log(slug)
    return slug;
}

module.exports = slugify;