const jwt=require('jsonwebtoken')
const token=jwt.sign({id:323232},'secret',{expiresIn:5})
setTimeout(() => {//token过期了，就取不到token中的数据
    jwt.verify(token,'secret',(err,decode)=>{
    console.log('err',err)
    console.log('decode',decode)
    })    
}, 6000);
