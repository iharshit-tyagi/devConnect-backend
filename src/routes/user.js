import { response, Router } from "express"
import { hashPassword, verifyPassword } from "../utils/hashHelper.js";
import { createUserinDB, getUserFromDB, getUsersListFromDB, updateUserInDB } from "../controllers/UserController.js";
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
    if (!email || !password || !name) {
        res.status(400).json({
            success: false,
            message: 'Invalid Input'
        });
        return;
    }
    next();

}

userRoute.post('/signin', checkLoginBody, getUserFromDB, verifyPassword, generateAccessToken, updateUserInDB, (req, res) => {


    res.status(200).json({
        success: true,
        result: 'Logged in',
        response: req?.userFromDB
    })
})
userRoute.post('/signup', checkSignUpBody, hashPassword, createUserinDB, generateAccessToken, updateUserInDB, (req, res) => {
    delete req?.userfromDB?.password

    res.status(200).json({
        success: true,
        result: 'Signed Up',
        response: req?.userfromDB
    })
})
userRoute.get('/userlist', checkAuthStatus, getUsersListFromDB, (req, res) => {
    res.status(200).json({
        success: true,
        response: req?.response
    })

})
export default userRoute;