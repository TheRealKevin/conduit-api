const User = require('../../entities/User/User');
const {genPassword,filterPassword, compareHash} = require('../../utils/Password/Password')
const {sign} = require('../../utils/Jwt/Jwt');

const addUser = async(data) => {
    if(!data.username || !data.email || !data.password){
        throw new Error('Kindly fill the credentials');
    }
    const user = await User.findOne({where: {email: data.email}});
    if(user){ 
        throw new Error('User with the same email already exists');
    }
    try{
        const hashedPass = await genPassword(data.password);
        // console.log(`Hashed Password is ${hashedPass} in Controller`);
        const newUser = await User.create({
            username: data.username,
            email : data.email,
            password : await genPassword(data.password)
        })
        await filterPassword(newUser);
        newUser.token = await sign(newUser)  
        return newUser; 
    }catch(err){
        //console.error(err);
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
    user.token = await sign(user);
    return filterPassword(user);
}

module.exports = {addUser,loginUser}; 