const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function GetAllUsers(req, res) {
  const alldbUsers = await User.find({});
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
  await User.findByIdAndDelete(req.params.id);
  res.json({ status: "deleted successfully" });
}

async function CreateNewUser(req, res) {
  // console.log(req.body);
  const body = req.body;
  // console.log(body);
  if (
    !body ||
    !body.firstName ||
    !body.email ||
    !body.userType ||
    !body.password
  ) {
    return res.status(400).json({ msg: "all fields are req..." });
  }
  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    // gender: body.gender,
    userType: body.userType,
  });
  return res.status(201).json({ msg: "success", id: result._id });
}

async function ValidateUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Add logic to compare hashed passwords here
  // For simplicity, let's assume plain text comparison for now
  if (user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const sessionID = uuidv4();
  setUser(sessionID, user);
  res.cookie("uid", sessionID);
  // return res.redirect("/home");
  return res.json({ message: "Login successful", userId: user._id });
}

module.exports = {
  GetAllUsers,
  GetUserById,
  UpdateUserById,
  deleteUserById,
  CreateNewUser,
  ValidateUserLogin,
};
