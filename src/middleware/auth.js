const { verify } = require('../utils/Jwt/Jwt');
                                                     // next is used when using middlewares
const authByToken = async (req,res,next) => {       //  runs the code below next() after all other middleware functions finished
    const authHeader = req.header("Authorization").split(' ');
    if(!authHeader) return res.status(401).json({
        errors : {  body : ['No Authorization Header']  }
    })
    if(authHeader[0] !== 'Token') return res.status(401).json({     // Checking if token header exists
        errors : {  body : ['Missing Token']  }
    })

    const token = authHeader[1];    // Contains the token value
    try{
        const user = await verify(token);
        if(!user) throw new Error('No user found in token')
        req.user = user;       // If verified, place user in req
        return next();      
    }catch(err){
        return res.status(401).json({
            errors : { body : [err.message]}
        })
    }
}

module.exports = authByToken;