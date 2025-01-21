import { response, Router } from "express"
import { hashPassword, verifyPassword } from "../utils/hashHelper.js";
import { createUserinDB, getUserFromDB } from "../controllers/UserController.js";

const userRoute = Router();

const checkLoginBody = (req, res, next) => {

    const email = req?.body?.email;
    const password = req?.body?.password;

    if (!email || !password) {
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
    const name = req?.body?.name;
    if (!email || !password || !name) {
        res.status(400).json({
            success: false,
            message: 'Invalid Input'
        });
        return;
    }
    next();

}

userRoute.post('/signin', checkLoginBody, getUserFromDB, verifyPassword, (req, res) => {
    delete req?.userFromDB?.password;

    res.status(200).json({
        success: true,
        result: 'Logged in',
        response: req?.userFromDB
    })
})
userRoute.post('/signup', checkSignUpBody, hashPassword, createUserinDB, (req, res) => {
    delete req?.userfromDB?.password

    res.status(200).json({
        success: true,
        result: 'Signed Up',
        response: req?.userfromDB
    })
})

export default userRoute;