import { Router } from "express";
import userRoute from "../routes/user.js";
import userAuth from "../routes/userAuth.js";
import matchesRoute from "../routes/matches.js";
const v1= Router();

v1.use('/user',userRoute);
v1.use('/auth',userAuth)
v1.use('/matches',matchesRoute);
export default v1;