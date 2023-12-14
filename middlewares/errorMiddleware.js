// error middleware || NEXT function
const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    const defaultErrors = {
        satusCode : 500,
        message : err,
    }
    
    // missing field error
    if(err.name === 'ValidationError')
    {
        defaultErrors.satusCode = 400
        defaultErrors.message = Object.values(err.errors)
        .map(item => item.message)
        .join(',');
    }
    // duplicate error
    if(err.code && err.code === 11000){
        defaultErrors.satusCode = 400
        defaultErrors.message = `${Object.keys(err.keyValue)} field has to be unique`;
    }
    res.status(defaultErrors.satusCode).json({ message: defaultErrors.message });
};


export default errorMiddleware;