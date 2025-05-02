import jwt from "jsonwebtoken";
export const generateAccessToken = async (req, res, next) => {
    const token = await jwt.sign({ id: req?.userFromDB?.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '500s' });
    try {
        res.cookie('accessToken', token, {
            httpOnly: true, // Prevents client-side access
            secure: true, // Ensures the cookie is sent over HTTPS
            sameSite: 'strict', // Prevents CSRF attacks
            maxAge: 3600000, // 1 hour
        })
        req.data = token;
        next();
    } catch (err) {
        next(err)
    }
}
export const generateRefreshToken = async (req, res, next) => {
    const token = await jwt.sign({ id: req?.userFromDB?.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '2 days' });
    try {
        res.cookie('refreshToken', token, {
            httpOnly: true, // Prevents client-side access
            secure: true, // Ensures the cookie is sent over HTTPS
            sameSite: 'strict', // Prevents CSRF attacks
            maxAge: 90000000,
        })
        req.refreshToken = token;
        next();
    } catch (err) {
        next(err)
    }
}
export const verifyToken = async (token) => {
    let decodedInfo = null;
    await jwt.verify(token, process.env.JWT_PRIVATE_KEY, function (err, decoded) {
        if (!err) {
            decodedInfo = decoded
        } else {


            decodedInfo = null;
        }
    });

    return decodedInfo;
}