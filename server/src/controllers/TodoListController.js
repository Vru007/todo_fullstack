const User=require('../models/user');
const jsonGenerate = require('../utils/helper');
const StatusCode = require('../utils/constants');
const getTodos= async (req,res)=>{

    try{
          const list= await User.findById(req.userId)
          .select("-password")
          .populate('todos')       
          .exec();
        
          return res.json(jsonGenerate(StatusCode.SUCCESS,"All todo list",list));
    }
    catch(error){
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ERROR,"error",error));
    }
}

module.exports=getTodos;