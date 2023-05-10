const createPostModel=require('../models/createPostModel');
const UserModel=require('../models/userModel');
const ConnectionModel=require('../models/connectionRequestModel');
const ErrorHandler = require('../utils/errorhandler');
const AcceptedConnectionModel=require('../models/acceptedRequestModel')

exports.createPost=async(req,res,next)=>{
    const userId=req.user._id;
    const {description}=req.body;
    let image=null
    if(req.body.image){
        //cloudinary impelementation will be there
       image=req.body.image
    }
    
    const newPost=new createPostModel({
        userId,
        description,
        userRole:req.user.role,
        image
    })
    await newPost.save();

    res.status(200).json({
        success:true,
        message:"Post uploaded succesfully",
        post:newPost
    })
    
   

}

exports.getDoctorConnections=async(req,res,next)=>{
   
  const doctorConnections=await UserModel.find({role:"doctor"});
  res.status(200).json({
    success:true,
    message:"Doctors fetched successfully",
    doctorConnections
  })
}

exports.getChemistConnections=async(req,res,next)=>{
   
    const chemistConnections=await UserModel.find({role:"chemist"});
    res.status(200).json({
      success:true,
      message:"Chemists fetched successfully",
      chemistConnections
    })
  }
  exports.getPatientConnections=async(req,res,next)=>{
   
    const patientConnections=await UserModel.find({role:"patient"});
    res.status(200).json({
      success:true,
      message:"Patients fetched successfully",
      patientConnections
    })
  }

exports.getAllPosts=async(req,res,next)=>{
    const {role}=req.body;
    let getAllPost;
    if(role){
     getAllPost=await createPostModel.find({userRole:role});
    }
    else{ 
        getAllPost=await createPostModel.find().populate('userId');
    }

    res.status(200).json({
        success:true,
        message:"All posts fetched successfully",
        getAllPost
    })
}

exports.sendConnectionRequest=async(req,res,next)=>{
  const to =req.params.userId;
  const userInfo=await UserModel.findOne({_id:req.user._id});
  if(!userInfo){
    next(new ErrorHandler("Internal Error Occured",404))
  }
  else{
      const connection=new ConnectionModel({
    name:userInfo.name,
    email:userInfo.email,
    from:req.user._id,
    to
  })
  await connection.save();
  res.status(200).json({
    success:true,
    message:"Connection sent successfully",
    connection
  })
}
}

exports.getAllConnectionRequest=async(req,res,next)=>{
  const userId=req.user._id;
  const connectionRequests=await ConnectionModel.find({to:userId}).populate('to').populate('from');
  res.status(200).json({
    success:true,
    message:"connection requests fetched successfully",
    connectionRequests
  })
}

exports.acceptConnection=async(req,res,next)=>{ 
  const requestId=req.params.requestId;
  const findSpecificRequest=await ConnectionModel.findOne({_id:requestId});
  if(!findSpecificRequest){
    next(new ErrorHandler("Internal Error",404));
  }
  else{
  
    const acceptedRequest=new AcceptedConnectionModel({
      name:findSpecificRequest.name,
      email:findSpecificRequest.email,
      from:findSpecificRequest.from,
      to:findSpecificRequest.to
    })
   await acceptedRequest.save();
   await ConnectionModel.deleteOne({_id:requestId})
   res.status(200).json({
    message:"Request Accepted succesfully",
    success:true,
    acceptedRequest
   })
  }
}

exports.getAcceptedConnection=async(req,res,next)=>{
  const to=req.user._id;
  const acceptedConnections=await AcceptedConnectionModel.find({to}).populate('to').populate('from');
  res.status(200).json({
    success:true,
    message:"Accepted List Fetched successfully",
    acceptedConnections
  })
}