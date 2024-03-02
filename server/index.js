const express= require('express');
const {router, protectedRoute} = require('./src/routes/api');
// const protectedRoute=require('./src/routes/api');
const mongoose = require('mongoose');
const Authmiddleware = require('./src/middlewares/Authmiddlewares');
const app=express();
require('dotenv').config();
app.use(express());
app.use(express.json());
app.use('/api',router);
app.use('/api',Authmiddleware,protectedRoute)
const PORT=8000;

mongoose.connect(process.env.MONGO_URI,{

  }).then(()=>{
    app.listen(PORT,()=>console.log(`listening on port ${PORT}`));
  }).catch(err=>console.log(err));


