const ErrorHandler = require("../utils/errorhandler")


const isAuth=(req,res,next)=>{
    if(req.user){
        next();
    }
    else{
        next(new ErrorHandler('Unauthorized please login to continue',401))

    }
}

module.exports=isAuth