import prisma from "../config/db.js";

export const checkIfMatchReqExist = async (req, res, next) => {
  try {
    const user1 = req?.params?.toUserId;
    const user2 = req?.userId;
    const mactchReq = await prisma.match_requests.findFirst({
      where: {
        OR: [
          {
            sender_id: user1,
            receiver_id: user2,
          },
          {
            sender_id: user2,
            receiver_id: user1,
          },
        ],
      },
    });
    if (mactchReq) {
      console.log(mactchReq);

      res.status(403).json({
        message: "Request already Exist",
        success: false,
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const getUserWithID = async (userId) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};

export const getAllMatches = async (req, res, next) => {
  try {
    const matches = await prisma.matches.findMany({
      where: {
        OR: [{ user1_id: req?.userId }, { user2_id: req?.userId }],
      },
      include: {
        user1: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            avatar_url: true,
            bio: true,
            skills: true,
          },
        },
        user2: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            avatar_url: true,
            bio: true,
            skills: true,
          },
        },
      },
    });

    return res.status(200).json({
      message: "List of all matches",
      data: matches,
    });
  } catch (err) {
    next(err);
  }
};

export const SendMatchRequest = async (req, res, next) => {
  const receiverUserId = req?.params?.toUserId;
  const senderUserId = req?.userId;
  try {
    const recUser = await getUserWithID(receiverUserId);
    if (!recUser) {
      res.status(404).json({
        message: "Receiver Does not exist",
      });
    } else {
      const matchReq = await prisma.match_requests.create({
        data: {
          sender_id: senderUserId,
          receiver_id: receiverUserId,
        },
      });
      req.matchReqInfo = matchReq;

      if (matchReq.status !== "error") {
        next();
      } else {
        res.status(402).json(matchReq);
      }
    }
  } catch (err) {
    next(err);
  }
};

export const getAllMatchRequests = async (req, res, next) => {
  try {
    const allRequest = await prisma.match_requests.findMany({
      where: {
        receiver_id: req?.userId,
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar_url: true,
            skills: true,
            bio: true,
            github_url: true,
            linkedin_url: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    req.matchReqs = allRequest;
    next();
  } catch (err) {
    next(err);
  }
};

export const acceptMatchRequest = async (req, res, next) => {
  try {
    //to accept  a match , i will have to match_req id with me
    const matchReq = await prisma.match_requests.findFirst({
      where: {
        id: req?.params?.reqId,
      },
    });
    if (!matchReq) {
      res.status(408).json({
        message: "Match Req Does not exist",
      });
      return;
    }
    const newMatch = await prisma.matches.create({
      data: {
        user1_id: matchReq?.receiver_id,
        user2_id: matchReq?.sender_id,
      },
    });
    if (newMatch) {
      req.matchInfo = newMatch;
      await prisma.match_requests.delete({
        where: {
          id: req?.params?.reqId,
        },
      });
      next();
    }
  } catch (err) {}
};

export const rejectMatchRequest = async (req, res, next) => {
  try {
    //to Reject   a match , i will have to match_req id with me
    const matchReq = await prisma.match_requests.findFirst({
      where: {
        id: req?.params?.reqId,
      },
    });
    if (!matchReq) {
      res.status(408).json({
        message: "Match Req Does not exist",
      });
      return;
    }

    const deleteMatch = await prisma.match_requests.delete({
      where: {
        id: req?.params?.reqId,
      },
    });
    req.deleteMatchInfo = deleteMatch;
    next();
  } catch (err) {
    next(err);
  }
};
