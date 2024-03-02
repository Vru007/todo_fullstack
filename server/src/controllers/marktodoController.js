const { validationResult } = require("express-validator");
const jsonGenerate = require("../utils/helper");
const StatusCode=require('../utils/constants');
const Todo=require('../models/todo');

const markTodo=async (req,res)=>{
    
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR,"todo id is required",error.mapped()));

    }

    try{
           const todo =await Todo.findOneAndUpdate({
            _id:req.body.todo_id,
            userId:req.userId
           }, [
            {
                $set: {
                    isCompleted: {
                        $not: "$isCompleted" // Toggle the value of isCompleted
                    }
                }
            }
        ],
        { new: true } // Return the updated document
           );

        // todo.isCompleted=!todo.isCompleted;
           
           if(todo){
            
            return res.json(jsonGenerate(StatusCode.SUCCESS,"todo has been updated",todo));
           }
    }
    catch(error){
       
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ERROR,"todo not updated ",error));
    }
}

module.exports=markTodo;