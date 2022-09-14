const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const {BadRequestError,UnauthenticatedError}= require('../errors');
const bcrypt = require('bcryptjs');

exports.register = async (req, res, next) => {
    const user = await User.create({ ...req.body });

    res.status(StatusCodes.CREATED).json({
        user: { name: user.getName(), email: user.email },
        token: user.createJWT(),
    });
};

exports.login = async (req, res, next) => {
    const {email,password}= req.body;
    if(!email || !password){
        throw new BadRequestError('Please provide email and password');
    }
    const user= await User.findOne({email});
    console.log(user);
    if(!user){
        throw new UnauthenticatedError('Invalid credentials');
    }
    const pwdCorrect = await bcrypt.compare(password,user.password);
    if(!pwdCorrect){
        throw new UnauthenticatedError('Invalid Password');
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK)
    .json({
        user:{
            name : user.getName()
        },
        token
    });
};
