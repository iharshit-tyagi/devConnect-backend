//Controllers related to user
import { response } from "express"
import prisma from "../config/db.js"

const checkIfUserExist = async (username) => {
    const response = await prisma.users.findFirst({ where: { username } });
    return response;
}
export const createUserinDB = async (req, res, next) => {
    try {
        const userInDB = await checkIfUserExist(req?.body?.name);
        console.log(userInDB);

        if (userInDB) {
            res.status(402).json({
                message: 'User already Exist'
            });
            return;
        }
        const response = await prisma.users.create({
            data: {
                username: req?.body?.name,
                email: req?.body?.email,
                password: req?.hashPassword
            }
        })
        res.status(200).json({ response });


    } catch (err) {
        console.log(err);
        res.json(err)
    }
}
export const getUserFromDB = async (req, res, next) => {
    try {
        const userInDB = await checkIfUserExist(req?.body?.name)
        if (!userInDB) {
            res.status(404).json({
                message: 'User Does not Exist'
            });
            return;
        }
        req.userFromDB = userInDB;
        next()
    }
    catch (err) {
        console.log(err);

    }
}
