const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const User=require('../../models/user')
const jwt=require('jsonwebtoken')
const bodyParser = require('body-parser');
const keys=require('../../config/keys')
const verifyToken=require('../../config/verifyToken')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

/**
 * @router GET api/user/test
 * @desc 返回的请求的json数据
 * @access public
 */

router.get('/test',(req,res)=>{
    res.json({
        code:2000,
        msg:'success',
        name:'ming'
    })
})


/**
 * @router GET api/user/current
 * @desc 返回用户登录信息  jwt 
 * @access public
 */
router.get('/',verifyToken,(req,res)=>{

    res.json({
        id:req.userId,
        token:req.token,
        data:[
            {
                id:0,
                name:"Liu Yifei",
                age:32,
                img:null
            },
            {
                id:1,
                name:"Xiao Hong",
                age:22,
                img:null
            },
            {
                id:2,
                name:"Xiao Fang",
                age:23,
                img:null
            }
        ]
    })
})





module.exports=router