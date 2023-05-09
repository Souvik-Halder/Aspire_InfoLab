const ErrorHandler = require('../utils/errorhandler')


const isCompany=(req,res,next)=>{
    if(req.user.role==='company'){
        next();
    }
    else{
        next(new ErrorHandler("Unauthorized you don't have access to use these resourcess",401))

    }
}

module.exports=isCompany