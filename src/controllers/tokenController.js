import prisma from "../config/db.js"
export const updateRefreshTokenInDB = async (req, res, next) => {
    try {
        const result = await prisma.refreshToken.create({
            data: {
                refreshToken: req?.refreshToken, userId: req?.userFromDB?.id, expiresAt: new Date(req?.expiresAt * 1000),
                ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress
            },
            // where: {
            //     // 
            //     userId: req?.userFromDB?.id
            // }

        });
        req.userFromDB = result;
        next();
    } catch (err) {
        next(err);
    }
}