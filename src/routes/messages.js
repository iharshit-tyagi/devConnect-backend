import { Router } from "express";
import { checkAuthStatus } from "../middlewares/authMiddleware.js";
import {
  sendMessage,
  getMessagesForAMatch,
} from "../controllers/messageController.js";
const messageRoute = Router();

messageRoute.post("/send", checkAuthStatus, sendMessage, (req, res) => {
  res.status(200).json({
    message: "Sent Successfully!",
    data: req?.messageInfo,
    success: true,
  });
});
messageRoute.post(
  "/getMessages",
  checkAuthStatus,
  getMessagesForAMatch,
  (req, res) => {
    res.status(200).json({
      message: "Sent Successfully!",
      data: req?.messageList,
      success: true,
    });
  }
);
export default messageRoute;
