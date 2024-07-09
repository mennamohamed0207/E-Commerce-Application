const globalError=(error,req,res,next)=>{

    //default values in case the error is not set
    error.statusCode=error.statusCode || 500;
    error.status=error.status || "error";
  
    //we can make the error more descrptive
    res.status(400).json({
      status:error.status,
      message:error.message,
      error:error,
      stack:error.stack
    })
  };

  module.exports=globalError