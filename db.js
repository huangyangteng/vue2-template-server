const mongoose=require('mongoose')
const mongoURI=require('./config/keys').mongoURI

mongoose.connect(mongoURI,{ useNewUrlParser: true })
    .then(()=>{console.log('连接成功')})
    .catch(()=>{console.log('连接失败')})

