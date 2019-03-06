const mongoose=require('mongoose')
const Schema=mongoose.Schema

//create schema
const BeautySchema=new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    date:{
        type:String,
        default:Date.now
    },
    score:{
        type:Number,
        default:80
    },
    img:{
        type:String
    }
})

// console.log(mongoose.model('users',UserSchema))
module.exports=Beauty=mongoose.model('beauty',BeautySchema)