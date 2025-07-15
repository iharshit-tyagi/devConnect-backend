import prisma from "../config/db.js"
export const  sendMessage =async (req,res,next)=>{
try{
const newMsg= await prisma.messages.create({
    data:{
        sender_id:req?.userId,
        content:'Hi There',
        match_id:'2b985247-0f43-4d9f-949d-a1b0912ee1f8',
    },
 
})
   req.messageInfo= newMsg;
   next();
}catch(err){
next(err)
}

}