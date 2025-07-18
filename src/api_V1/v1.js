import { Router } from "express";
import userRoute from "../routes/user.js";
import userAuth from "../routes/userAuth.js";
import matchesRoute from "../routes/matches.js";
import messageRoute from "../routes/messages.js";
const v1 = Router();
//test
v1.use("/user", userRoute);
v1.use("/auth", userAuth);
v1.use("/matches", matchesRoute);
v1.use("/message", messageRoute);
export default v1;
