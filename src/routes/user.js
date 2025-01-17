import { Router } from "express"

const userRoute=Router();

const checkLoginBody=(req,res,next)=>{
  
    const email = req?.body?.email;
    const password= req?.body?.password;
    
    if( !email || !password){
        res.status(400).json({
            success: false,
            message: 'Email or Password is missing'
        });
        return;
    }
  next();
   
}
const checkLogoutBody=(req,res,next)=>{
    const email = req?.body?.email;
    const password= req?.body?.password;
    const name = req?.body?.name;
    if( !email || !password || !name){
        res.status(400).json({
            success: false,
            message: 'Invalid Input'
        });
        return;
    }
  next();
   
}

userRoute.post('/signin',checkLoginBody,(req,res)=>{
res.status(200).json({
    success: true,
    result: 'Logged in'
})
})
userRoute.post('/signup',checkLogoutBody,(req,res)=>{
res.status(200).json({
    success: true,
    result: 'Signed Up'
})
})

export default userRoute;