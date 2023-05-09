const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    userRole:{
        type:String,
        required:true
    },
    image:{
        type:String,
       
    
    }, 
    description:{
        type:String,
        required:true
 
    },

    date:{
        type:Date,
        default:Date.now,
    }
})

const user=mongoose.model('Post',userSchema,'posts');

module.exports=user;