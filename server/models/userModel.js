const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    
    }, 
    password:{
        type:String,
 
    },

    role:{
        type:String,
        default:'user'
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

const user=mongoose.model('User',userSchema,'users');

module.exports=user;