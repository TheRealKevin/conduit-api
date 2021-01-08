const User = require('../../entities/User/User');

const addUser = async(data) => {
    const newUser = await User.create({
        username: data.username,
        email : data.email
    })
    return newUser;
}


const loginUser = async data => {   
    
}

module.exports = addUser;