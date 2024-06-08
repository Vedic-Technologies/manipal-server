const User = require("../models/user");
const Staff = require("../models/staff");
const Patient = require("../models/registerPatient");
const PatientPayment = require("../models/patientPaymentSchema");

async function getAllusers(req, res) {
  const allusers = await User.find({});
  console.log(allusers);
  return res.json(allusers);
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "admin not found" });
  return res.json(user);
}

async function deleteUserById(req, res) {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  if (userId === "66001456d97f0e8e6039f26c") {
    return res.status(403).send("Action not allowed for this admin entry");
  }
  // Start a new session and transaction
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Delete associated patients within the transaction
    await Patient.deleteMany({ adminID: userId }).session(session);

    // Delete associated payments within the transaction
    await PatientPayment.deleteMany({ adminID: userId }).session(session);

    // Delete associated staff within the transaction
    await Staff.deleteMany({ adminID: userId }).session(session);

    // Delete the user within the transaction
    await User.findByIdAndDelete(userId).session(session);

    // Commit the transaction if all deletions are successful
    await session.commitTransaction();
    session.endSession();
    return res.json({
      success: true,
      message: "User and all associated data deleted successfully",
    });
  } catch (error) {
    // Abort the transaction if any operation fails
    await session.abortTransaction();
    session.endSession();
    return res.status(500).send({
      success: false,
      message: "Failed to delete user and associated data",
      error,
    });
  }
}

async function getPatient(req, res) {
  try {
    const patient = await Patient.find({});
    return res.json(patient);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getPatientById(req, res) {
  const patient = await Patient.findById(req.params.id);
  if (!patient) return res.status(404).json({ error: "patient not found" });
  return res.json(patient);
}

async function deletePatientById(req, res) {
  try {
    const ExistingPatient = await Patient.findById(req.params.id);
    // console.log(ExistingPatient, req.user);
    if (!ExistingPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    const deletedPayment = await PatientPayment.deleteMany({
      patientId: req.params.id,
    });

    // Remove the patient
    const result = await Patient.findByIdAndDelete(req.params.id);
    res.json({
      status: "deleted successfully",
      data: { patient: result, payments: deletedPayment },
    });
  } catch (error) {
    return res.status(500).json({ error: "internal server" });
  }
}

async function getPayments(req, res) {
  try {
    const payment = await PatientPayment.find({});
    if (!payment) {
      return res.status(404).json({ error: "payment not found" });
    }
    return res.json(payment);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getPaymentById(req, res) {
  const payment = await PatientPayment.findById(req.params.id);
  if (!payment) return res.status(404).json({ error: "payment not found" });
  return res.json(payment);
}

async function deletePaymentById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.json({ status: "deleted successfully" });
}

async function getAllStaffs(req, res) {
  const alldbStaffs = await Staff.find({});
  console.log(alldbStaffs);
  return res.json(alldbStaffs);
}

async function GetStaffById(req, res) {
  const staff = await Staff.findById(req.params.id);
  if (!staff) return res.status(404).json({ error: "Staff not found" });
  return res.json(staff);
}

async function deleteStaffById(req, res) {
  const result = await Staff.findByIdAndDelete(req.params.id);
  res.json({ status: "deleted successfully", data: result });
}


async function getUsersWithPatientsAndPayments(req, res) {
  try {
    // Fetch all users
    const users = await User.find({});
    // Map over each user and fetch associated patients
    const structuredData = await Promise.all(
      users.map(async (user) => {
        const patients = await Patient.find({ adminID: user._id });
        // Structure patients with their associated payments
        const structuredPatients = await Promise.all(
          patients.map(async (patient) => {
            const payments = await PatientPayment.find({
              patientId: patient._id,
            });

            console.log(payments);
            return {
              [patient._id]: {
                patientData: patient,
                payments: payments,
              },
            };
          })
        );
        const staffs = await Staff.find({ adminID: user._id });
        console.log(staffs);
        return {
          user,
          patients: structuredPatients,
          staffs,
        };
      })
    );

    return res.json(structuredData);
  } catch (error) {
    // console.error("Error fetching users with patients and payments:");
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllusers,
  getUserById,
  deleteUserById,
  getPatient,
  getPatientById,
  deletePatientById,
  getPayments,
  getPaymentById,
  deletePaymentById,
  getAllStaffs,
  GetStaffById,
  deleteStaffById,
  getUsersWithPatientsAndPayments,
};
