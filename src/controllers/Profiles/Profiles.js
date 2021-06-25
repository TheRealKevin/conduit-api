const { User } = require('../../entities/entities');

//      FIXES

//  1. Fix "User was not found" error 

const getProfile = async(username) => {
        if(!username) throw new Error('Username of the required profile is empty');
        console.log(`username is ${username}`);
        const user = await User.findOne({
            attributes : [
                "username",
                "bio",
                "image"
            ],
            where : {username : username}
        })

        if(!user) throw new Error('User does not exist');
        return user;
}

module.exports = { getProfile };