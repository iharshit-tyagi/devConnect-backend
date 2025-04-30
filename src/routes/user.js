import { response, Router } from "express"
import { hashPassword, verifyPassword } from "../utils/hashHelper.js";
import { createUserinDB, getUserFromDB, getUsersListFromDB, deleteUserInDB, updateAccessTokenInDB, updateUserInDB } from "../controllers/UserController.js";
import { generateAccessToken } from "../utils/jwtHelper.js";
import { checkAuthStatus } from "../middlewares/authMiddleware.js";

const userRoute = Router();

const checkLoginBody = (req, res, next) => {

    const email = req?.body?.email;
    const password = req?.body?.password;
    const username = req?.body?.username;

    if (!(email || username) || !password) {
        res.status(400).json({
            success: false,
            message: 'Email or Password is missing'
        });
        return;
    }
    next();

}
const checkSignUpBody = (req, res, next) => {
    const email = req?.body?.email;
    const password = req?.body?.password;
    const name = req?.body?.username;
    const firstName = req?.body?.firstName;
    if (!email || !password || !name || !firstName) {
        res.status(400).json({
            success: false,
            message: 'Invalid Input'
        });
        return;
    }
    next();

}

const readDataToUpdate = (req, res, next) => {
    try {
        const dataToUpdate = req?.body;
        // console.log(dataToUpdate);

        if (Object.keys(dataToUpdate).length > 0) {
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

userRoute.post('/signin', checkLoginBody, getUserFromDB, verifyPassword, generateAccessToken, updateAccessTokenInDB, (req, res) => {

    delete req?.userFromDB?.password;
    delete req?.userFromDB?.accessToken;
    res.status(200).json({
        success: true,
        result: 'Logged in',
        response: req?.userFromDB
    })
})
userRoute.post('/signup', checkSignUpBody, hashPassword, createUserinDB, generateAccessToken, updateAccessTokenInDB, (req, res) => {
    delete req?.userFromDB?.password

    res.status(200).json({
        success: true,
        result: 'Signed Up',
        response: req?.userFromDB
    })
})
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
export default userRoute;