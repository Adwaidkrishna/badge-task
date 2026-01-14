////////////////////////////////////////
const express=require('express')
const mongoose=require('mongoose')

require('dotenv').config()

const authRoutes=require('./routes/auth')
const protectedRoutes=require('./routes/protected')

const app =express()

app.use(express.json())

app.use('/api/auth',authRoutes)
app.use('/api',protectedRoutes)

app.get('/',(req,res)=>{
    res.send('Api running')
})

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('mongodb connected')
})
.catch((err)=>console.error(err))

const PORT=5000;

app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
}) 