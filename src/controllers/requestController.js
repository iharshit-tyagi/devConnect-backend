import prisma from "../config/db.js";


const getUserWithID=async (userId)=>{
try{
const user = await prisma.users.findFirst({
    where:{
        id:userId
    }
})
return user;

}catch(err){
    console.log(err);
    
}
}
export const SendMatchRequest= async (req,res,next)=>{
    const receiverUserId= req?.params?.toUserId;
    const senderUserId=req?.userId;
    try{
  const recUser= await  getUserWithID(receiverUserId);
  if(!recUser){
    res.status(404).json({
        message:'Receiver Does not exist'
    })
  }else{
  const matchReq= await   prisma.match_requests.create({
        data:{
            sender_id:senderUserId,
            receiver_id:receiverUserId
        }
    })
    console.log(matchReq);
    
    if(matchReq.status!=='error'){

        next()
    } else{
        res.status(402).json(matchReq);
    }
 
  }

}
catch(err){
next(err)
}

}