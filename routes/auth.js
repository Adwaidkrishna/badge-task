const express=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User = require('../models/User')
const {signupValidation,loginValidation}=require('../middleware/validate')

const router=express.Router()

router.post('/signup',signupValidation,async(req,res)=>{
    

    try{
        const {email,password}=req.body

    const existingUser=await User.findOne({email})
    if(existingUser){
        return res.status(400).json({error:'user already exists'})
    }

    const hashedPassword =await bcrypt.hash(password,10)//salt rounds

    const user =new User ({
        email,
        password:hashedPassword
    })

    await user.save()

    res.status(201).json({message:'user registered successfully'})
  }catch(err){
    res.status(500).json({message:'server error'})
  }   


})

router.post('/login',loginValidation,async(req,res)=>{
    try{
        const {email,password}=req.body

        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({error:'invalid credentials'})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({error:'password is wrong'})
        }

        const token =jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        )
        
        res.json({token})
    }catch(err){
        res.status(500).json({error:'server error'})
    }
  
})

module.exports=router