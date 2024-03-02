const  {check} =require("express-validator");

const RegisterSchema=[
     
    check('name').trim().isAlpha()
    .withMessage('Name should be Alphabets only'),

    check('username','username is required').exists()
    .isAlphanumeric()
    .withMessage('Username should be alphanumeric only')
    .trim().isLength({max:32}),

    check('password','password is required').exists().isLength({min:6,max:32}).trim(),
    check('email','email is required').exists().isEmail(),
]

module.exports =RegisterSchema;