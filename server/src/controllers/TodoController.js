const { validationResult } =require("express-validator");
const jsonGenerate =require( "../utils/helper");
const Todo=require("../models/todo");
const StatusCode =require('../utils/constants');
const User = require("../models/user");
const createTodo =async (req,res)=>{
        
    const error= validationResult(req);
    if(!error.isEmpty()){
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"Todo is required",error.mapped()));
    }

    try{
          
        const result= await Todo.create({
            userId: req.userId,
            task:req.body.task,

        })

        if(result){
            const user=await User.findOneAndUpdate({_id:req.userId},
                {
                   $push:{todos:result},
                })
        }
    }
    catch(error){
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ERROR,"Something went wrong",error.mapped()));
    }
}

module.exports=createTodo