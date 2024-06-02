const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const header = req.headers["authorization"];
  // console.log(req.headers);
  console.log(header);
  if (!header)
    return res.status(401).json({ message: "no token please login" });

  const Token = header.split("Bearer ")[1];
  const user = getUser(Token);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  req.user = user;
  next();
}

// function restrictTo(roles = []) {
//   return function (req, res, next) {
//     if (!req.user) return res.json({ message: "restrict access" });

//     if (!roles.includes(req.user.role))
//       return res.json({ message: "restrict access" });

//     return next();
//   };
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
