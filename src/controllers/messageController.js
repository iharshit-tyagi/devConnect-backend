import prisma from "../config/db.js";
export const sendMessage = async (req, res, next) => {
  try {
    const newMsg = await prisma.messages.create({
      data: {
        sender_id: req?.userId,
        content: req?.body?.message,
        match_id: req?.body?.matchId,
      },
    });
    req.messageInfo = newMsg;
    next();
  } catch (err) {
    next(err);
  }
};

export const getMessagesForAMatch = async (req, res, next) => {
  try {
    const messages = await prisma.messages.findMany({
      where: {
        match_id: req?.body?.matchId,
      },
    });
    req.messageList = messages;
    next();
  } catch (err) {
    next(err);
  }
};
