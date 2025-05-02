import prisma from "../config/db.js"
export const updateRefreshTokenInDB = async (req, res, next) => {
    try {
        const result = await prisma.refreshToken.update({
            data: { accessToken: req?.refrehToken },
            where: {
                // 
                userId: req?.userFromDB?.id
            }

        });
        req.userFromDB = result;
        next();
    } catch (err) {
        next(err);
    }
}