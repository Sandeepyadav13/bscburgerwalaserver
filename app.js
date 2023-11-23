import express, { urlencoded } from "express";
import dotenv from "dotenv"
import  {connectPassport } from "./utils/Provider.js"
import session from "express-session";
import userRouter from "./routes/user.js"
import orderRouter from "./routes/order.js"
import passport from "passport";
import cookieParser from "cookie-parser";
import { errorMiddlewares } from "./middlewares/errorMiddlewares.js";
import cors from "cors"
 
const app =express();

dotenv.config({
        path:"./config/config.env"
});

//using middleware 
app.use(
        session({
        secret:process.env.SESSION_SECRET,
        resave:false,        //create session
        saveUninitialized:false,

        
        cookie:{
                secure:process.env.NODE_ENV==="development"?false:true,
                httpOnly:process.env.NODE_ENV==="development"?false:true,
                sameSite:process.env.NODE_ENV==="development"?false:"none",
        },
})); 

app.use(cookieParser());  // cell cookies parser to get cookies from web site 
app.use(express.json());
app.use(urlencoded({
        extended:true,
}));

app.use(cors({
        credentials:true,
        origin:process.env.FRONTEND_URL,
        methods:["GET","POST","PUT","DELETE"],

}));

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());              //cell passport in app.js 
app.enable("trust proxy") ; 


//cell passport--config ke bas our router ke pahle used.
connectPassport();

//importing Router
app.use("/api/v1",userRouter);
app.use("/api/v1",orderRouter);

//using errormiddlewares 
app.use(errorMiddlewares)

export default app;