const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  req.user = null;

  const tokenCookie = req.cookies?.token;
  // if (!tokenCookie) return res.json({ message: "please login" });

  const user = getUser(tokenCookie);
  console.log(user);
  // if (!user) return res.status(401).json({ message: "please login" });

  req.user = user;
  return next();
}

// function restrictTo(roles = []) {
//   return function (req, res, next) {
//     if (!req.user) return res.json({ message: "restrict access" });

//     if (!roles.includes(req.user.role))
//       return res.json({ message: "restrict access" });

//     return next();
//   };
// }

// async function restrictToLoggedinUserOnly(req, res, next) {
//   const userUid = req.headers["authorization"];

//   // console.log(req.headers);
//   if (!userUid)
//     return res.status(401).json({ message: "no token please login" });

//   const Token = userUid.split("Bearer ")[1];
//   const user = getUser(Token);
//   if (!user) return res.status(401).json({ message: "Unauthorized" });

//   req.user = user;
//   next();
// }

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  checkForAuthentication,
  checkAuth,
};
