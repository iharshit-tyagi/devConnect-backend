import { Router } from "express";
import userRoute from "../routes/user.js";
import userAuth from "../routes/userAuth.js";
const v1= Router();

v1.use('/user',userRoute);
v1.use('/auth',userAuth)
export default v1;