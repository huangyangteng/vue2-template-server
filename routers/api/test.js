const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const User=require('../../models/user')
const jwt=require('jsonwebtoken')
const bodyParser = require('body-parser');
const verifyToken =require('../../config/verifyToken')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

/**
 * @router GET api/user/test
 * @desc 返回的请求的json数据
 * @access public
 */

router.get('/test',verifyToken,(req,res)=>{
    res.json({
        code:2000,
        msg:'success',
        id:req.userId
    })
})


router.get('/test1',(req,res)=>{
    jwt.sign({id:'111'},'secret',{expiresIn:3600*24},(err,token)=>{
        res.json({
            code:2000,
            msg:'success',
            token
    })
    })
    
})
// uri携带的参数在query上
router.get('/test2',verifyToken,(req,res)=>{
    console.log('uri携带的参数',req.query)
    res.json({
        code:2000,
        msg:'success',
        id:req.userId
    })
})





module.exports=router