import { Router } from "express";
import { checkAuthStatus } from "../middlewares/authMiddleware.js";
import {
  SendMatchRequest,
  getAllMatchRequests,
  acceptMatchRequest,
  rejectMatchRequest,
  getAllMatches,
  checkIfMatchReqExist,
} from "../controllers/requestController.js";
const matchesRoute = Router();

//List of all matches
matchesRoute.get("/", checkAuthStatus, getAllMatches, (req, res) => {
  res.status(200).json({
    message: "List of all matches",
    data: req?.matchInfo,
    success: true,
  });
});

//Send a match request
matchesRoute.post(
  "/request/:toUserId",
  checkAuthStatus,
  checkIfMatchReqExist,
  SendMatchRequest,
  (req, res) => {
    res.status(200).json({
      message: "Sent rquest to user ",
      data: req.matchReqInfo,
      success: true,
    });
  }
);

//Get list of all match requests
matchesRoute.get(
  "/requests",
  checkAuthStatus,
  getAllMatchRequests,
  (req, res) => {
    res.status(200).json({
      message: "List of all match requests",
      data: req?.matchReqs,
      success: true,
    });
  }
);
//Accept a match request--> I will have userId , will use that
matchesRoute.patch(
  "/accept/:reqId",
  checkAuthStatus,
  acceptMatchRequest,
  (req, res) => {
    res.status(200).json({
      message: "Match Accepted",
      data: req?.matchInfo,
      success: true,
    });
  }
);

//Rejects a match request
matchesRoute.delete(
  "/reject/:reqId",
  checkAuthStatus,
  rejectMatchRequest,
  (req, res) => {
    res.status(200).json({
      message: "Match rejected",
      data: req.deleteMatchInfo,
      success: true,
    });
  }
);

export default matchesRoute;
