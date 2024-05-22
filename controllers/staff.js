const { v4: uuidv4 } = require("uuid");
const Staff = require("../models/staff");
const { setStaff } = require("../service/auth");

async function GetAllStaffs(req, res) {
  // const user = req.user;
  console.log("first")
  const alldbStaffs = await Staff.find({  });
  return res.json(alldbStaffs);
}

async function GetStaffById(req, res) {
  const Staff = await Staff.findById(req.params.id);
  if (!Staff) return res.status(404).json({ error: "Staff not found" });
  return res.json(Staff);
}

async function UpdateStaffById(req, res) {
  try {
    const StaffUpdates = req.body;
    const Staff = await Staff.findById(req.params.id);
    if (!Staff) {
      return res.status(404).json({ error: "Staff not found" });
    }
    Object.keys(StaffUpdates).forEach((key) => {
      Staff[key] = StaffUpdates[key];
    });

    const updatedStaff = await Staff.save();
    return res.json({ status: "update success", Staff: updatedStaff });
  } catch (error) {
    console.error("Error updating patient:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteStaffById(req, res) {
  await Staff.findByIdAndDelete(req.params.id);
  res.json({ status: "deleted successfully" });
}

async function CreateNewStaff(req, res) {
  // console.log(req.body);
  const body = req.body;
  // console.log(body);
  if (!body || !body.firstName || !body.email || !body.password) {
    return res.status(400).json({ msg: "all fields are req..." });
  }
  const result = await Staff.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    contact: body.contact,
    gender: body.gender,
  });
  return res.status(201).json({ msg: "success", id: result._id });
}

// async function ValidateStaffLogin(req, res) {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: "Email and password are required" });
//   }

//   const Staff = await Staff.findOne({ email });

//   if (!Staff) {
//     return res.status(404).json({ error: "Staff not found" });
//   }

//   // Add logic to compare hashed passwords here
//   // For simplicity, let's assume plain text comparison for now
//   if (Staff.password !== password) {
//     return res.status(401).json({ error: "Invalid credentials" });
//   }

//   const sessionID = uuidv4();
//   setStaff(sessionID, Staff);
//   res.cookie("uid", sessionID);
//   // return res.redirect("/home");
//   return res.json({ message: "Login successful", Staff: Staff });
// }

module.exports = {
  GetAllStaffs,
  GetStaffById,
  UpdateStaffById,
  deleteStaffById,
  CreateNewStaff,
  // ValidateStaffLogin,
};
