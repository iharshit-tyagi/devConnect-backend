import jwt from "jsonwebtoken";
export const generateAccessToken = async (req, res, next) => {

    const token = await jwt.sign(req?.userFromDB, process.env.JWT_PRIVATE_KEY, { expiresIn: '500s' });
    try {
        res.cookie('accessToken', token)
        req.data = token;
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