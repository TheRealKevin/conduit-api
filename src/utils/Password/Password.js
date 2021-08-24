const bcrypt = require('bcryptjs');
// const saltRounds = 10;

const filterPassword = async (data) => {
    if(data.password){
        await delete data.dataValues.password;
    }
    return data;
}

const genPassword = async (data) => {
    const password = data;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        // console.log(`Hash is ${hashedPassword} in Password file`);
        return hashedPassword;
    }catch(err){
        console.error(err);
    }
}

const compareHash = (hash,password) => {
   //const password = data;
    const unHashedPassword = bcrypt.compareSync(password,hash);
    if(!unHashedPassword) return false;
    else return true;
}

module.exports = {genPassword,filterPassword,compareHash};

/*

//      Testing

const test = async () => {
    // const pass = 'ArsenalFC';
    // const hash = await genHash(pass);
    // compareHash(hash);
    // console.log(`Password is ${pass} and hash is ${hash}`);
    const user = {
        name : 'Test1',
        email: 'test1@mail.com',
        password: 'Test1Password'
    }
    const temp = filterPassword(user);
    console.log(temp);
}

test();

*/