//Add middleware to check if user has auth
import { verifyToken } from "../utils/jwtHelper.js";
export const checkAuthStatus = async (req, res, next) => {
  // const result = await verifyToken('req?.cookies?.accessToken');
  const result = await verifyToken(req?.cookies?.accessToken);
  if (result) {
    // console.log(result);
    req.userId = result?.id;
    next();
  } else {
    res.status(401).json({ message: "Unauthorised Request" });
  }
  // console.log(result);
};
