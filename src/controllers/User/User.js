const { User } = require('../../entities/entities');
const { filterPassword } = require('../../utils/Password/Password');

const getUserByUsername = async (username) => {
    const user = await User.findOne({
        attributes : [
            "username",
            "email",
            "bio",
            "image",
            "token"
        ],
        where : {username : username}
    });
    if(!user) throw new Error(`User with given username doesn't exist`);
    return filterPassword(user);
}

const updateUser = async (oldUser,  newUser) => {
    // console.log('In user controller, old user is',oldUser);
    // console.log('In user controller, new user is',newUser);
    try{
        const updatedUser = await User.update({
            password : newUser.password || oldUser.password,
            email: newUser.email || oldUser.email,
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
                "image",
                "token"
            ],
            where : {username : oldUser.username}
        });
        if(!user) throw new Error('Updated user could not be found');
        // console.log('In user controller, updatedUser is',user);
        return filterPassword(user);
    }catch(err){
        throw err;
    }
}

module.exports = { getUserByUsername, updateUser };