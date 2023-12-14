import mongoose from "mongoose";
import validator from "validator";

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
    },
    location:{
        type: String,
        default:"India",
    },
    
}, {timestamps:true}

);


export default mongoose.model('User', userScehma);