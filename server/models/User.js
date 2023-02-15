const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

 const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

 },
 { timestamps: true}
 );


// <------ static signup method ------>
UserSchema.statics.signup = async function(username,email, password, ) {
    // <---- validation ---->
    if(!username || !email || !password){
        throw Error("All fields must be filled")
    }
    if(!validator.isAlphanumeric(username)){
        throw Error('username not valid')
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enought")
    }
    const usernameExists = await this.findOne({username})
    if(usernameExists) {
        throw Error('This username already in use')
    }
    const emailExists = await this.findOne({email})
    if(emailExists) {
        throw Error('Email already in use')
    }
    
    // <---- Hash password ---->
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    
    // <---- Create user in DB ---->
   const user = await this.create({username,email,password: hashPassword})
   return user;
}

// <------ static login method ------>
UserSchema.statics.login = async function(username, password) {
    if(!username || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({username})
    if(!user) {
         throw Error("Incorrect Username")
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error("Incorrect")
    }
    return user;
}

 module.exports = mongoose.model("User", UserSchema)