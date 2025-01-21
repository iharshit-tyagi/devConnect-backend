import jwt from "jsonwebtoken";

export const generateAccessToken = async (req, res, next) => {

    const token = await jwt.sign(req?.userFromDB, process.env.JWT_PRIVATE_KEY, { expiresIn: '500s' });
    res.cookie('accessToken', token)
    next();
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