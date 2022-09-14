const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    name :{
        type :String,
        required:[true,'please provide name'],
        minlength:3,
        maxlength:50
    },
    email:{
        type :String,
        required:[true,'please provide email'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "please enter a valid email"],
        unique:true
    },
    password :{
        type :String,
        required:[true,'please provide a password'],
        minlength:6
    }
})
UserSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password,salt);
});

UserSchema.methods.getName = function(){
    return this.name;
}
UserSchema.methods.createJWT = function(){
    const token = jwt.sign({email:this.email,userId:this._id},process.env.JWT_SING_HASH,{expiresIn:'1h'});
    return  token;
}

module.exports = mongoose.model('User',UserSchema);