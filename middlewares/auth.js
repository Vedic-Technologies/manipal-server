const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  req.user = null;
  const authHeader = req.headers["authorization"];
  // console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided, please login" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Malformed token, please login" });
  }

  const user = getUser(token); // Implement getUser to validate the token
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user;
  console.log(user)
  next();
}

function blocked(req, res, next) {
  return res.status(500).json({ message: "under maintainance" });
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) {
      return res
        .status(403)
        .json({ message: "Access restricted: User not authenticated" });
    }
    if (!roles.includes(req.user.userType)) {
      return res
        .status(403)
        .json({ message: "Access restricted: Insufficient permissions" });
    }
    console.log(req.user, "-----------------------");
    return next();
  };
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  checkForAuthentication,
  checkAuth,
  restrictTo,
  blocked,
};
