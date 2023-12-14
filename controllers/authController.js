import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
    
        const {name, email, password} = req.body;
        
        // validate
        // if(!name){
        //     next("name is required");
        // }

        // if(!email){
        //     next("email is required");
        // }

        // if(!password){
        //     next("password is required & greater than 6 charcaters");
        // }

        // const existingUser = await userModel.findOne({email});
        // if(existingUser){
        //     next("Email Already Registered Please Login");
        // };

        const user = await userModel.create({name,email,password});
        res.status(201).send({
            success:true,
            message:"User Created Successfully",
            user,
        });

    
};