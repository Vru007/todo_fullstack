const mongoose= require('mongoose');

const Schema=mongoose.Schema;

const userSchema= new Schema({
    
    name:{
        type:String,
        required:true

    },
    username:{
        type:String,
        required:true,
        unique:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    todos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo",

    }]

})
const User=mongoose.model('User',userSchema);
module.exports=User;