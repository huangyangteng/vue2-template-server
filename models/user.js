const mongoose=require('mongoose')
const Schema=mongoose.Schema

//create schema
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:Date.now
    },
    identity:{
        type:String,
        default:'member'
    }
})

// console.log(mongoose.model('users',UserSchema))
module.exports=User=mongoose.model('users',UserSchema)