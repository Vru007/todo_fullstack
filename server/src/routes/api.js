const express=  require('express');
const Register=require('../controllers/RegisterController');
const Login=require('../controllers/LoginController');
const Todo=require("../controllers/TodoController");
const markTodo=require("../controllers/marktodoController");
const  {check} =require("express-validator");
const Authmiddleware=require('../middlewares/Authmiddlewares');
const Loginvalidation=require('../validationSchema/Loginvalidation');
const RegisterSchema =require('../validationSchema/RegisterSchema');
const removeTodo=require("../controllers/removeTodoController");
const router=express.Router();
const protectedRoute=express.Router();
const getTodos=require('../controllers/TodoListController');
router.post('/register',RegisterSchema,Register);
router.post('/login',Loginvalidation,Login);

// protected Routes

protectedRoute.post('/todo',[check("task","Todo is required").exists()],Todo);
protectedRoute.get('/todolist',getTodos);
protectedRoute.post('/marktodo',[check("todo_id","todo id is required").exists()],markTodo);
protectedRoute.post('/removetodo',[check("todo_id","todo id is required").exists()],removeTodo);

module.exports = {router,protectedRoute};