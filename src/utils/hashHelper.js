import bcrypt from "bcrypt"
import client from "../config/db.js";
import { getUserFromDB } from "../controllers/UserController.js";

const saltRounds = 10;

export const hashPassword = async (req, res, next) => {
   bcrypt.hash(req?.body?.password, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      req.hashPassword = hash;
      next();

   });

}
export const verifyPassword = async (req, res, next) => {
   // Load hash from your password DB.
   // await getUserFromDB();
   console.log(req?.userFromDB);

   bcrypt.compare(req?.body?.password, req?.userFromDB?.password, function (err, result) {
      if (!result) {
         res.status(401).json({
            message: "Incorrect Password"
         })
         return;
      }
      req.correctPassword = result;
      next();

   });

}