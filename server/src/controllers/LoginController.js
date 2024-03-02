const User=require("../models/user");
const { validationResult } = require("express-validator");
const jsonGenerate = require("../utils/helper");
const StatusCode=require("../utils/constants");
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;
const Login=async (req, res) => {
    
   const errors=validationResult(req);

   if(errors.isEmpty()){
       
      const {username, password}=req.body;

      const user =await User.findOne({username: username});
      if(!user){
         return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ERROR,"username or password is incorrect"));

      }

      const pass=bcrypt.compareSync(password,user.password);
      if(!pass){
         return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ERROR,"username or password is incorrect"))
      }
       
      const token=jwt.sign({userId:user._id},JWT_SECRET_KEY);

      return res.json(jsonGenerate(StatusCode.SUCCESS,"successfully LoggedIn",{userId:user._id,token:token}))
        
   }

   return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"validation error", errors.mapped()));
}

module.exports = Login;