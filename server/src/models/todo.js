const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const todoSchmea=new Schema({
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    task:{
        type:String,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
        // required:true,

    },
    date:{
        type:Date,
        default:Date.now(),
    }
})

const Todo = mongoose.model('Todo',todoSchmea);
module.exports=Todo;