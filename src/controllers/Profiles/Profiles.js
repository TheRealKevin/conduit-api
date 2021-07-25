const { User } = require('../../entities/entities');

//      FIXES

//  1. Fix "User was not found" error 

const getProfile = async (username) => {
    try{
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

    }catch(err){
        throw err;
    }
}

// const followProfile = async (username, user) => {
//     if(!username) throw new Error('Invalid username');
//     let toFollow;
//     try{
//         toFollow = await User.findOne({where : { username : username}});
//         if(!toFollow) throw new Error('No profile with such username exists');
//         if(user.username === toFollow.username) throw new Error('Invalid request to follow self')

        
//     }catch(err){
//         throw err;
//     }
// }

module.exports = { getProfile };