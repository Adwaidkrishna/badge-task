const express = require('express')
const auth=require('../middleware/auth')

const router=express.Router()

router.get('/profile',auth,(req,res)=>{
    res.json({
        message:'protected data',
        userId:req.userId  
    })
})

module.exports=router