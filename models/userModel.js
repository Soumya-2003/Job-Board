import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import JWT  from "jsonwebtoken";

// schema
const userScehma = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Name is Required'],
    },
    lastName:{
        type: String,
    },
    email:{
        type:String,
        required:[true, 'Email is Required'],
        unique: true,
        validate: validator.isEmail,
    },
    password:{
        type:String,
        required:[true,'Password is Required'],
        minlength:[6,"Password length must be greater than 6 Characters"],
        select:true,
    },
    location:{
        type: String,
        default:"India",
    },
    
}, {timestamps:true}

);

// middlewares
userScehma.pre('save', async function() {
    if(!this.isModified) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
});

// compare password
userScehma.methods.comparePassword = async function(userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
};

// JSON WEBTOKEN
userScehma.methods.createJWT = function(){
    return JWT.sign({userId:this._id}, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};



export default mongoose.model('User', userScehma);