import { Router } from "express"

const userRoute=Router();

userRoute.post('/signin',(req,res)=>{
res.status(200).json({
    success: true,
    result: 'Logged in'
})
})
userRoute.post('/signup',(req,res)=>{
res.status(200).json({
    success: true,
    result: 'Signed Up'
})
})

export default userRoute;