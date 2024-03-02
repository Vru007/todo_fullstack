const { validationResult } =require("express-validator");
const jsonGenerate =require( "../utils/helper");
const StatusCode =require('../utils/constants');
const Todo =(req,res)=>{
        
    const error= validationResult(req);
    if(!error.isEmpty()){
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Todo is required",error.mapped()));
    }
}

module.exports=Todo