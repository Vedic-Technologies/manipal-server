// const { v4: uuidv4 } = require("uuid");
const Staff = require("../models/staff");
const User = require("../models/user");
const { findById } = require("../models/user");
const { setStaff } = require("../service/auth");

async function GetAllStaffs(req, res) {
  const adminID = req.user._id;
  if (!adminID) {
    return res.status(404).json({ msg: "invalid token or expired" });
  }
  // console.log("staff");
  const alldbStaffs = await Staff.find({ adminID });
  console.log(alldbStaffs);
  return res.json(alldbStaffs);
}

async function GetStaffById(req, res) {
  const staff = await Staff.findById(req.params.id);
  if (!staff) return res.status(404).json({ error: "Staff not found" });
  return res.json(staff);
}

async function CreateNewStaff(req, res) {
  // console.log(req.user);
  const adminID = req.user._id;
  const adminExist = await User.findById(adminID);
  if (!adminExist) {
    return res.status(404).json({ msg: "invalid token or expired" });
  }

  const body = req.body;
  if (!body || !body.firstName || !body.email || !body.password) {
    return res.status(400).json({ msg: "all fields are req..." });
  }

  const StaffExist = await Staff.findOne({ email: body.email });
  if (StaffExist) {
    return res.status(404).json({ msg: "email already in use" });
  }
  const result = await Staff.create({
    adminID,
    ...body,
  });
  console.log(result);

  return res.status(201).json({
    msg: "success",
    result: { ...result._doc, createdBy: adminExist.email },
  });
}

async function UpdateStaffById(req, res) {
  try {
    const StaffUpdates = req.body;
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }
    Object.keys(StaffUpdates).forEach((key) => {
      staff[key] = StaffUpdates[key];
    });
    const updatedStaff = await staff.save();
    return res.json({ msg: "update success", data: updatedStaff });
  } catch (error) {
    console.error("Error updating patient:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteStaffById(req, res) {
  const adminID = req.user._id;
  const ExistingStaff = await Staff.findById(req.params.id);
  // console.log(ExistingPatient, req.user);
  if (!ExistingStaff) {
    return res.status(404).json({ error: "staff not found" });
  }

  if (ExistingStaff.adminID.toString() !== adminID.toString()) {
    return res.status(403).json({
      message: "Unauthorized: You can only delete staff you have created",
    });
  }
  await Staff.findByIdAndDelete(req.params.id);
  res.json({ status: "deleted successfully" });
}

module.exports = {
  GetAllStaffs,
  GetStaffById,
  UpdateStaffById,
  deleteStaffById,
  CreateNewStaff,
};
