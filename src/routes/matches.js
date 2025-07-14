import { Router } from "express";
import { checkAuthStatus } from "../middlewares/authMiddleware.js";
import { SendMatchRequest ,getAllMatchRequests,acceptMatchRequest,rejectMatchRequest, getAllMatches} from "../controllers/requestController.js";
const matchesRoute= Router();

//List of all matches
matchesRoute.get('/',checkAuthStatus,getAllMatches,(req,res)=>{
    res.status(200).json({
        message:'List of all matches',
        data:req?.matchInfo
    })
})

//Send a match request
matchesRoute.post('/request/:toUserId',checkAuthStatus,SendMatchRequest,(req,res)=>{
    const toUserId= req?.params?.toUserId;
    console.log(toUserId);
    
    res.status(200).json({
    message:"Sent rquest to user "+toUserId,
    data: req.matchReqInfo
    })
})

//Get list of all match requests
matchesRoute.get('/requests',checkAuthStatus,getAllMatchRequests,(req,res)=>{
    res.status(200).json({
    message:"List of all match requests",
    data: req?.matchReqs
    })
})
//Accept a match request--> I will have userId , will use that 
matchesRoute.patch('/accept/:reqId',checkAuthStatus,acceptMatchRequest,(req,res)=>{
    res.status(200).json({
        message:'Match Accepted',
        data:req?.matchInfo
    })
})

//Rejects a match request
matchesRoute.delete('/reject/:reqId',checkAuthStatus,rejectMatchRequest,(req,res)=>{
    res.status(200).json({
        message:'Match rejected',
        data:req.deleteMatchInfo
      
    })
})

export default matchesRoute;