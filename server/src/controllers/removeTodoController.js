const { validationResult } = require("express-validator");
const jsonGenerate = require("../utils/helper");
const StatusCode=require("../utils/constants");
const Todo = require("../models/todo");
const User = require("../models/user");
// const { json } = require("express");

const removeTodo=async(req,res)=>{

    const error=validationResult(req);

    if(!error.isEmpty()) {

        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"todo Id is required",error.mapped()));
    }

     try{
    const result=await Todo.findOneAndDelete({
        _id:req.body.todo_id,
        userId:req.userId
    });
         if(result){
            const user=await User.findOneAndUpdate({
                _id:req.userId,

            },{
                $pull:{todos:req.body.todo_id}
            });

            return res.json(jsonGenerate(StatusCode.SUCCESS,"deleted succssfully",null))
         }
   }
   catch(err) {
          
    return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ERROR,"Not deleted",error));
   }
}

module.exports=removeTodo;