const express=  require('express');
const Register=require('../controllers/RegisterController')
const router=express.Router();

router.post('/register',Register);

module.exports = router;