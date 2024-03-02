const  {check} =require("express-validator");

const LoginSchema=[
     

    check('username','username is required').exists()
    .isAlphanumeric()
    .withMessage('Username should be alphanumeric only')
    .trim().isLength({max:32}),

    check('password','password is required').exists().isLength({min:6,max:32}).trim(),
]

module.exports =LoginSchema;