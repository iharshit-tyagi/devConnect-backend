import { Router } from "express";
import {
  createUserinDB,
  getUserFromDB,
} from "../controllers/UserController.js";
import { verifyPassword, hashPassword } from "../utils/hashHelper.js";
import { updateRefreshTokenInDB } from "../controllers/tokenController.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwtHelper.js";
const userAuth = Router();

const checkLoginBody = (req, res, next) => {
  const email = req?.body?.email;
  const password = req?.body?.password;
  const username = req?.body?.username;

  if (!(email || username) || !password) {
    res.status(400).json({
      success: false,
      message: "Email or Password is missing",
    });
    return;
  }
  next();
};
const checkSignUpBody = (req, res, next) => {
  const email = req?.body?.email;
  const password = req?.body?.password;
  const name = req?.body?.username;
  const firstName = req?.body?.firstName;
  if (!email || !password || !name || !firstName) {
    res.status(400).json({
      success: false,
      message: "Invalid Input",
    });
    return;
  }
  next();
};

userAuth.post(
  "/signin",
  checkLoginBody,
  getUserFromDB,
  verifyPassword,
  generateAccessToken,
  generateRefreshToken,
  updateRefreshTokenInDB,
  (req, res) => {
    delete req?.userFromDB?.password;
    delete req?.userFromDB?.refreshToken;
    res.status(200).json({
      success: true,
      result: "Logged in",
      response: req?.userFromDB,
    });
  }
);
userAuth.post(
  "/signup",
  checkSignUpBody,
  hashPassword,
  createUserinDB,
  generateAccessToken,
  generateRefreshToken,
  updateRefreshTokenInDB,
  (req, res) => {
    delete req?.userFromDB?.password;

    res.status(200).json({
      success: true,
      result: "Signed Up",
      response: req?.userFromDB,
    });
  }
);

userAuth.post("/logout", (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false, // set to true if using https
    sameSite: "strict", // or "lax" depending on your frontend setup
  });

  res.status(200).json({
    message: "Logged out",
  });
});
export default userAuth;
