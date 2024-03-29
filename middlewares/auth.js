const { getUser } = require("../service/auth");

async function restrictToLoggedin(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.status(401).json({ message: "Unauthorized" });

  const user = await getUser(userUid);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  req.user = user;
  next();
}

module.exports = { restrictToLoggedin };
