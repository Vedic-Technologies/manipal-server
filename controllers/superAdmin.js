const User = require("../models/user");
const Staff = require("../models/staff");
const SuperAdmin = require("../models/superAdmin");
const { generateToken } = require("../service/auth");

async function GetAllSuperAdmin(req, res) {
  const allSuperAdmins = await SuperAdmin.find({});
  console.log(allSuperAdmins);
  return res.json(allSuperAdmins);
}

async function GetAdminById(req, res) {
  const admin = await SuperAdmin.findById(req.params.id);
  if (!admin) return res.status(404).json({ error: "admin not found" });
  return res.json(admin);
}

async function UpdateAdminById(req, res) {
  try {
    const userUpdates = req.body;
    const admin = await SuperAdmin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: "admin not found" });
    }
    Object.keys(userUpdates).forEach((key) => {
      admin[key] = userUpdates[key];
    });

    const updatedUser = await admin.save();
    return res.json({ status: "update success", user: updatedUser });
  } catch (error) {
    console.error("Error updating patient:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteAdminById(req, res) {
  // block specific deletion
  const defaultAdmin = await SuperAdmin.findById(req.params.id);
  if (!defaultAdmin) {
    return res.status(404).json({ message: "admin not found" });
  }
  if (
    defaultAdmin.email === "superAdmin@gmail.com" &&
    defaultAdmin._id.toString() === "665e2d6594fa2f91d9f80386"
  ) {
    return res
      .status(403)
      .send("Action not allowed for the default SuperAdmin");
  }
  await SuperAdmin.findByIdAndDelete(req.params.id);
  res.json({ status: "deleted successfully" });
}

async function CreateNewSuperAdmin(req, res) {
  const body = req.body;
  if (!body || !body.firstName || !body.email || !body.password) {
    return res.status(400).json({ msg: "all fields are req..." });
  }

  const adminExist = await SuperAdmin.findOne({ email: body.email });
  if (adminExist) {
    return res.status(400).json({ message: "Email already in use." });
  }
  const result = await SuperAdmin.create({
    ...body,
    userType: "superAdmin",
  });
  return res.status(201).json({ msg: "success", admin: result });
}

async function ValidateSuperAdminLogin(req, res) {
  const { email, password, userType } = req.body;
  console.log(email, password, userType);

  if (!email || !password) {
    return res.status(400).json({ error: "Email, password are required" });
  }
  const superAdmin = await SuperAdmin.findOne({ email });

  console.log("superAdmin:", superAdmin);

  if (!superAdmin) {
    return res.status(404).json({ error: "super admin not found" });
  }

  if (superAdmin.password !== password) {
    return res.status(404).json({ error: "invalid password" });
  }

  const token = generateToken(superAdmin);
  if (!token) {
    return res.json({ error: "error generating token" });
  }

  return res.json({ message: "Login successful", superAdmin, token });
}



module.exports = {
  GetAllSuperAdmin,
  GetAdminById,
  UpdateAdminById,
  deleteAdminById,
  CreateNewSuperAdmin,
  ValidateSuperAdminLogin,
};
