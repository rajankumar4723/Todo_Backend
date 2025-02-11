class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}



export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";      //not match error 
    err.statusCode = err.statusCode || 500;      

    return res.status(err.statusCode).json({
        success: true,
        message: err.message
    })
    // return res.status(404).json({
    //     success: true,
    //     message: err.message
    // })

}
export default ErrorHandler;