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
        msg:'success'
    })
})


/**
 * @router POST api/user/reg
 * @desc 返回的请求的json数据
 * @access public
 */

router.post('/reg',(req,res)=>{

    const {name,pass}=req.body
    // 判断有没有这个用户
    User.findOne({name})
        .then(user=>{
            if(user){//如果存在这个用户
                return res.status(400).json({user:"该用户名已经被注册"})
            }else{
                const newUser=new User({
                    name,
                    pass
                })
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.pass,salt,(err,hash)=>{
                        if(err)throw err
                        newUser.pass=hash
                        newUser.save()
                        .then(user=>res.json(user))
                        .catch(err=>console.log(err))

                    })
                })
                
            }
        })
    
})


/**
 * @router POST api/user/login
 * @desc 返回token  jwt 
 * @access public
 */
router.post('/login',(req,res)=>{
    const {name,pass}=req.body
    User.findOne({name})
        .then(user=>{
            if(!user){
                return res.status(404).json({name:"用户名不存在"})
            }
            // 密码匹配
            bcrypt.compare(pass,user.pass)
                .then(isMatch=>{

                    if(isMatch){//登录成功，返回token
                        const rule={id:user.id,name:user.name}
                        jwt.sign(rule,keys.secretOrKey,{expiresIn:3600*24},(err,token)=>{
                            if(err)throw err
                            res.json({
                                msg:'ok',
                                token
                            })
                        })


                    }else{
                        return res.status(400).json({password:'密码错误'})
                    }
                })
        })
})

/**
 * @router GET api/user/current
 * @desc 返回用户登录信息  jwt 
 * @access public
 */
router.get('/current',verifyToken,(req,res)=>{

    res.json({
        id:req.userId,
        token:req.token
    })
})





module.exports=router