const jwt =require('jsonwebtoken')

const auth=(req,res,next)=>{
    try{
        const authHeader=req.header('Authorization')

        if(!authHeader){
            return res.status(401).json({error:'no token provided'})
        }

        const token=authHeader.split(' ')[1]

        const decoded=jwt.verify(token, process.env.JWT_SECRET)

        req.userId=decoded.userId 

        next()
    }catch(err){
        res.status(401).json({error:'invalid or expired token'})
    }
}

module.exports=auth