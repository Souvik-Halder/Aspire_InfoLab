

const mongoose=require('mongoose');

const requestSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    from:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    to:{
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    sentAt:{
        type:Date,
        default:Date.now
    }
});

const requestModel=mongoose.model('Connection',requestSchema,'connection');
module.exports=requestModel