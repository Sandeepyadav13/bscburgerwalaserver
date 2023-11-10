import Errorhandler from "../utils/ErrorHandler.js";

export const isauthenticated =(req,res,next)=>{
const token =req.cookies["connect.sid"];  
if(!token) {
    return next (new Errorhandler("Not Logged In",401));
}
next();
};
export const authorizeAdmin =(req,res,next)=>{
if(req.user.role!=="admin") {
    return next (new Errorhandler("Only Admin allowed",405));
}
next();
};