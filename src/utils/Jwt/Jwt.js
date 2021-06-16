const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../../config/JWTSecret');

const sign = user => {
    return new Promise((res,rej) => {
        jwt.sign({
            username: user.username,
            email: user.email
        }, JWT_SECRET, (err,encoded) => {
            if(err) {
                return rej(err)
            }else{
                res(encoded)
            }
        })
    })
}

const verify = token => {
    return new Promise((res,rej) => {
        jwt.verify(token, JWT_SECRET, (err,encoded) => {
            if(err){
                return rej(err);
            }else{
                return res(encoded);
            }
        })
    })
}

// -----> TESTING -----

// const run = async () => {
//     try{
//         const token = await sign({
//             email: 'abc@mail.com',
//             username: 'Kevin'
//         })
//         console.log(`Token -> ${token}`);
//         const x = await verify(token);
//         console.log('Verify -> ',x);
//     }catch(err){
//         console.error(err);
//     }
// }

// run()

module.exports = {sign,verify};