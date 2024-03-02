const express=  require('express');
const Register=require('../controllers/RegisterController');
const Login=require('../controllers/LoginController');
const Todo=require("../controllers/TodoController");
const  {check} =require("express-validator");
const Authmiddleware=require('../middlewares/Authmiddlewares');
const Loginvalidation=require('../validationSchema/Loginvalidation');
const RegisterSchema =require('../validationSchema/RegisterSchema')
const router=express.Router();
const protectedRoute=express.Router();
router.post('/register',RegisterSchema,Register);
router.post('/login',Loginvalidation,Login);

// protected Routes

protectedRoute.post('/todo',[check("task","Todo is required").exists()],Todo);


module.exports = {router,protectedRoute};