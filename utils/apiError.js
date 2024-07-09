//this class is resposible for throwing errors that I want to show to the user
class apiError extends Error
{
    constructor(message, statusCode)
    {
        super(message);
        this.statusCode = statusCode;
        this.status=`${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
    }
}
module.exports=apiError