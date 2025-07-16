import {  Router } from "express"

import {  getSignedinUser,getUsersListFromDB, deleteUserInDB, updateUserInDB } from "../controllers/UserController.js";

import { checkAuthStatus } from "../middlewares/authMiddleware.js";


const userRoute = Router();

const readDataToUpdate = (req, res, next) => {
    try {
        const dataToUpdate = req?.body;
        // console.log(dataToUpdate);

        if (Object.keys(dataToUpdate).length > 0) {
            const rawSkills = req.body.skills;

            const parsedSkills = rawSkills
                    .split(',')
                    .map(skill => skill.trim())
                    .filter(skill => skill !== '');

                req.body.skills=parsedSkills;

            next();
            return;
        } else {
            res.status(400).json({
                message: 'Invalid Input'
            })
        }
    } catch (err) {
        next(err)
    }
}

userRoute.get('/userlist', checkAuthStatus, getUsersListFromDB, (req, res) => {
    res.status(200).json({
        success: true,
        response: req?.response
    })

})

userRoute.patch('/update', checkAuthStatus, readDataToUpdate, updateUserInDB, (req, res) => {

    res.status(200).json({
        success: true,
        result: 'User Updated',
        response: req?.userFromDB
    })
})
userRoute.delete('/delete', checkAuthStatus, deleteUserInDB, (req, res) => {
    //   if(req?.deleted){

    //   }
    res.status(200).json({
        message: 'User Deleted'
    })
})

userRoute.get('/view',checkAuthStatus,getSignedinUser,(req,res)=>{
   delete req?.user?.password;
    res.status(200).json(req?.user);
})
export default userRoute;