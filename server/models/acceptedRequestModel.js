

const mongoose=require('mongoose');

const acceptedRequestSchema= mongoose.Schema({
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

const approvedRequestModel=mongoose.model('ApprovedRequests',acceptedRequestSchema,'approvedrequest');
module.exports=approvedRequestModel