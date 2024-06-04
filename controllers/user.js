const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const Staff = require("../models/staff");
const { generateToken, getUser } = require("../service/auth");

async function GetAllUsers(req, res) {
  const alldbUsers = await User.find({});
  console.log(alldbUsers);
  return res.json(alldbUsers);
}

async function GetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
}

async function UpdateUserById(req, res) {
  try {
    const userUpdates = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    Object.keys(userUpdates).forEach((key) => {
      user[key] = userUpdates[key];
    });

    const updatedUser = await user.save();
    return res.json({ status: "update success", user: updatedUser });
  } catch (error) {
    console.error("Error updating patient:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteUserById(req, res) {
  if (req.params.id === "66001456d97f0e8e6039f26c") {
    return res
      .status(403)
      .send("Action not allowed for this admin entry");
  }
  await User.findByIdAndDelete(req.params.id);
  res.json({ status: "deleted successfully" });
}

async function CreateNewUser(req, res) {
  const body = req.body;
  if (!body || !body.firstName || !body.email || !body.password) {
    return res.status(400).json({ msg: "all fields are req..." });
  }

  const userExist = await User.findOne({ email: body.email });
  if (userExist) {
    return res.status(400).json({ message: "Email already in use." });
  }
  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    contact: body.contact,
    gender: body.gender,
    userType: "admin",
  });
  return res.status(201).json({ msg: "success", user: result });
}

async function ValidateUserLogin(req, res) {
  const { email, password, userType } = req.body;
  console.log(email, password, userType);

  if (!email || !password || !userType) {
    return res
      .status(400)
      .json({ error: "Email, password and userType are required" });
  }

  //find user if usertype is staff
  let user;
  if (userType === "staff") {
    user = await Staff.findOne({ email });
  } else if (userType === "admin") {
    user = await User.findOne({ email });
  } else {
    return res.status(404).json({ error: "invalid userType" });
  }
  console.log(user);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (user.password !== password) {
    return res.status(404).json({ error: "invalid password" });
  }
  if (!user.userType) {
    return res
      .status(404)
      .json({ error: "invalid post user please add userType" });
  }

  const token = generateToken(user);
  if (!token) {
    return res.json({ error: "error generating token" });
  }

  return res.json({ message: "Login successful", user: user, token: token });
}

module.exports = {
  GetAllUsers,
  GetUserById,
  UpdateUserById,
  deleteUserById,
  CreateNewUser,
  ValidateUserLogin,
};
