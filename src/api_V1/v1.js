import { Router } from "express";
import userRoute from "../routes/user.js";
const v1= Router();

v1.use('/user',userRoute);
export default v1;