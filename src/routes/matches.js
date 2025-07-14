import { Router } from "express";
import { checkAuthStatus } from "../middlewares/authMiddleware.js";
import { SendMatchRequest } from "../controllers/requestController.js";
const matchesRoute= Router();

//List of all matches
matchesRoute.get('/',(req,res)=>{
    res.status(200).json({
        message:'List of all matches'
    })
})

//Send a match request
matchesRoute.post('/request/:toUserId',checkAuthStatus,SendMatchRequest,(req,res)=>{
    const toUserId= req?.params?.toUserId;
    console.log(toUserId);
    
    res.status(200).json({
    message:"Sent rquest to user "+toUserId
    })
})

//Get list of all match requests
matchesRoute.get('/requests',(req,res)=>{
    res.status(200).json({
    message:"List of all match requests"
    })
})

//Accept a match request
matchesRoute.post('/accept',(req,res)=>{
    res.status(200).json({
        message:'Match Accepted'
    })
})

export default matchesRoute;