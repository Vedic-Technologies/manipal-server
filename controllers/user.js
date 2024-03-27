const User = require("../models/user");
const Client = require("../models/login")

async function GetAllUsers(req, res) {
  const alldbUsers = await Client.find({});
  return res.json(alldbUsers);
}

async function GetUserById(req, res) {
  const user = await Client.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
}

async function UpdateUserById(req, res) {
  await Client.findByIdAndUpdate(req.params.id, { lastName: "changed" });
  res.json({ status: "success patched" });
}

async function deleteUserById(req, res) {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ status: "deleted successfully" });
}

async function CreateNewUser(req, res) {
  console.log(req.body);
  const body = req.body;
  console.log(body)
  if (
    // !body ||
    // !body.firstName ||
    // !body.lastName ||
    !body.email ||
    // !body.gender ||
    // !body.jobTitle
    !body.password
  ) {
    return res.status(400).json({ msg: "all fields are req..." });
  }
  const result = await Client.create({
    // firstName: body.firstName,
    // lastName: body.lastName,
    email: body.email,
    password: body.password
    // gender: body.gender,
    // jobTitle: body.jobTitle,
  });
  return res.status(201).json({ msg: "success", id: result._id });
}


async function ValidateUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await Client.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Add logic to compare hashed passwords here
  // For simplicity, let's assume plain text comparison for now
  if (user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
   return res.json({ message: "Login successful", userId: user._id });
}

module.exports = {
  GetAllUsers,
  GetUserById,
  UpdateUserById,
  deleteUserById,
  CreateNewUser,
  ValidateUserLogin
};
