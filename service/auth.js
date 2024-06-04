const jwt = require("jsonwebtoken");
const secret = "manipal$server$";

function generateToken(user) {
  if (!user.userType) {
    return;
  }
  const payload = {
    _id: user.userType === "staff" ? user.adminID : user._id,
    userType: user.userType,
    email: user.email,
  };
  return jwt.sign(payload, secret);
}

function getUser(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  getUser,
};
