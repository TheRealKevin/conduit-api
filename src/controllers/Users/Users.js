const { User } = require('../../entities/entities');
const {genPassword,filterPassword, compareHash} = require('../../utils/Password/Password')
const {sign} = require('../../utils/Jwt/Jwt');

const addUser = async(data) => {
    if(!data.username){
        throw new Error('Kindly enter a username');
    }
    if(!data.email){
        throw new Error('Kindly enter an email');
    }
    if(!data.password){
        throw new Error('Kindly enter a password');
    }
    const user = await User.findOne({where: {username: data.username}});
    if(user){ 
        throw new Error('User with the same email already exists');
    }
    try{
        const newUser = await User.create({
            username: data.username,
            email : data.email,
            password : await genPassword(data.password),
            token : await sign(data.username,data.email)
        })


        const updatedNewUser = await User.findOne({
            attributes : [
                "email",
                "username",
                "bio",
                "image", 
                "token"
            ],
            where : { username : newUser.username }
        })
        console.log('In User route',updatedNewUser);
        // updatedNewUser.token = await sign(updatedNewUser)   
        return filterPassword(updatedNewUser); 
    }catch(err){
        console.log('In user controller',err);
        throw err;
    }
}

const loginUser = async(data) => {   
    if(!data.email || !data.password){
        throw new Error('Kindly fill the credentials');
    }

    // Checking whether the user with the email entered exists in the db or not
    const user = await User.findOne({where: {email : data.email}});
    if(!user){
        throw new Error('User with this email does not exist');
    }
    // user.password -> Is the hash stored in db and data.password is the password entered by the user
    const passCheck = compareHash(user.password,data.password);
    if(!passCheck){
        throw new Error('Wrong Password');
    }
    // console.log('In users controllers,',user.username,user.email);
    user.token = await sign(user.username,user.email);
    return filterPassword(user);
}

module.exports = {addUser,loginUser};  