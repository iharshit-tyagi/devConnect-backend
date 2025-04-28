//Controllers related to user

import prisma from "../config/db.js"

const checkIfUserExist = async (username, email) => {
    const response = await prisma.users.findFirst({
        where: {
            OR:
                [{ username },
                { email }
                ]
        }
    });
    return response;
}
export const createUserinDB = async (req, res, next) => {
    try {
        const userInDB = await checkIfUserExist(req?.body?.username);


        if (userInDB) {
            res.status(402).json({
                message: 'User already Exist'
            });
            return;
        }
        const response = await prisma.users.create({
            data: {
                username: req?.body?.username,
                email: req?.body?.email,
                password: req?.hashPassword,
                firstName: req?.body?.firstName
            }
        })
        req.userFromDB = response;
        next();

    } catch (err) {
        console.log(err);
        res.json(err)
    }
}
export const getUserFromDB = async (req, res, next) => {
    try {
        const userInDB = await checkIfUserExist(req?.body?.username, req?.body?.email)
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

export const getUsersListFromDB = async (req, res, next) => {
    try {
        const result = await prisma.users.findMany({
            select: {
                username: true,
                email: true,
            },
        });
        req.response = result;
        // req.userFromDB = userInDB;
        next()
    }
    catch (err) {
        console.log(err);
    }
}

export const updateAccessTokenInDB = async (req, res, next) => {
    try {
        const result = await prisma.users.update({
            data: { accessToken: req?.data },
            where: {
                // 
                id: req?.userFromDB?.id
            }

        });
        req.userFromDB = result;
        next();
    } catch (err) {
        next(err);
    }
}




