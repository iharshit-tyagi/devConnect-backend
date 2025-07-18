import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassword = async (req, res, next) => {
  bcrypt.hash(req?.body?.password, saltRounds, async function (err, hash) {
    // Store hash in your password DB.
    req.hashPassword = hash;
    next();
  });
};
export const verifyPassword = async (req, res, next) => {
  // Load hash from your password DB.

  bcrypt.compare(
    req?.body?.password,
    req?.userFromDB?.password,
    function (err, result) {
      if (!result) {
        res.status(401).json({
          message: "Incorrect Password",
        });
        return;
      }
      delete req?.userFromDB?.password;
      req.correctPassword = result;
      next();
    }
  );
};
