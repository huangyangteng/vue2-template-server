const express=require('express')
const app=express()
const db=require('./db')

global.__root=__dirname+'/'

app.get('/api',(req,res)=>{
    res.status(200).send('API works')
})

const UserController=require(__root+'routers/api/user')
app.use('/api/users',UserController)

const TestController=require(__root+'routers/api/test')
app.use('/api/tests',TestController)


module.exports=app