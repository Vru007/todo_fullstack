const jsonGenerate = require("../utils/helper");
const StatusCode = require("../utils/constants");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
require('dotenv').config();
const jwt =require('jsonwebtoken');
const Authmiddleware=(req,res,next) => {

    if(req.headers['authorization']===undefined){
        return res.json(jsonGenerate(StatusCode.AUTH_ERROR,"Access Denied"));
    }

    const token=req.headers['authorization'];

    try{
        const decoded=jwt.verify(token,JWT_SECRET_KEY)
        console.log(decoded);

        req.userId=decoded.userId;

        return next();
    }catch(err){
         
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ERROR,"Invalid Token"));

    }

}

module.exports=Authmiddleware;