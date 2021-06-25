const { User } = require('../../entities/entities');
const { filterPassword } = require('../../utils/Password/Password');

const getUserByEmail = async (email) => {
    const user = await User.findOne({
        attributes : [
            "username",
            "email",
            "bio",
            "image"
        ],
        where : {email : email}
    });
    if(!user) throw new Error(`User with given email doesn't exist`);
    return filterPassword(user);
}

const updateUser = async (oldUser,  newUser) => {
    const updatedUser = await User.update({
        password : newUser.password || oldUser.password,
        username: newUser.username || oldUser.username,
        bio: newUser.bio || oldUser.bio,
        image: newUser.image || oldUser.image
    },{ where : {username : oldUser.username},
        returning : true,   // To populate the instances with updated values
        plain : true    // To het returned instance as plain object
    });
    const user = await User.findOne({ 
        attributes : [
            "email",
            "username",
            "bio",
            "image"
        ],
        where : {username : oldUser.username}
    });
    return filterPassword(user);
}

module.exports = {getUserByEmail,updateUser};