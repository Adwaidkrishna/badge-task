const {body ,validationResult}=require('express-validator')

const signupValidation=[
    body('email').isEmail().withMessage('invalid email'),
    body('password')
    .isLength({min:6})
    .withMessage('password must be 6 character'),

    (req,res,next)=>{
        const error=validationResult(req)
        if(!error.isEmpty()){// empty allangil R
            return res.status(400).json({error:error.array()})
        }
        next()
    }
]

const loginValidation= [
    body('email').isEmail(),
    body('password').notEmpty(),

    (req,res,next)=>{
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }
        next()
    }
]

module.exports={signupValidation,loginValidation }