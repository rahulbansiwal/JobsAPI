const User = require('../models/User');
const jwt = require('jsonwebtoken');
const{UnauthenticatedError}= require('../errors');
require('dotenv').config();

const auth = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('Token not provided!');
    }
    const token = authHeader.split(' ')[1];
    try{
        const payload = jwt.verify(token,process.env.JWT_SING_HASH );
        req.user= {userId:payload.userId,email:payload.email};
    }
    catch(err){
        throw new UnauthenticatedError('Invalid Token');
    }
     next()
}
module.exports = auth;