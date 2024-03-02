 const { validationResult } = require("express-validator");
const jsonGenerate = require("../utils/helper");
const User = require("../models/user");
const StatusCode = require("../utils/constants");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;
 const Register = async (req,res)=>{
    
    const errors=validationResult(req);
    
    if(errors.isEmpty()){
             
        const {name,username,password,email}=req.body;

        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        
      const existing = await User.findOne({ $or: [{ email: email }, { username: username }] });

      if(existing){
          
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ERROR, "User already exists"));
      }

        try{
            const result= await User.create({
                name:name,
                username:username,
                password:hashedpassword,
                email:email
            })
            
            const token=jwt.sign({userId:result._id},JWT_SECRET_KEY);
            res.json(jsonGenerate(StatusCode.SUCCESS,"registration successful",{userId:result._id,token:token}));
        }catch(e){
            console.log(e);
        }


    }
    res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"validation error",errors.mapped()));

}

module.exports= Register;
