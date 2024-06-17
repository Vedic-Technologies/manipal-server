const Patient = require("../models/registerPatient");
const Payment = require("../models/patientPaymentSchema");
const User = require("../models/user");
const cloudinary = require("../cloudinary");
const mongoose = require("mongoose");

async function RegisterPatient(req, res) {
  const user = req.user;
  const body = req.body;
  // console.log(body);
  if (!body || !body.patientName || !body.gender || !body.age) {
    return res.status(400).json({ msg: "all fields are req..." });
  }
  const defaultImg =
    "https://res.cloudinary.com/df0mfuut3/image/upload/v1718384931/default%20image/user_yrev00.png";

  try {
    let imageUrl = defaultImg;
    if (body.image) {
      const result = await cloudinary.uploader.upload(body.image);
      imageUrl = result.secure_url;
    }
    // if !image then procced with defaultImg url
    const newPatient = await Patient.create({
      adminID: user._id,
      ...body,
      image: imageUrl,
    });

    // console.log(newPatient, "----------------------------");

    return res.status(201).json({ newPatient: newPatient });
  } catch (error) {
    res.status(500).json({ err: error });
  }
}

// async function updatePatients(req, res) {
//   try {
//     const user = await User.findById("66001456d97f0e8e6039f26c");
//     console.log(user);
//     if (!user) {
//       console.error("user not found");
//     }

//     const result = await Patient.updateMany({
//       adminID: "66001456d97f0e8e6039f26c",
//     });
//     console.log(`${result.nModified} patients updated with doctorId`);

//     const allPatients = await Patient.find({
//       adminID: "66001456d97f0e8e6039f26c",
//     });
//     return res.json(allPatients);
//     process.exit(1);
//   } catch (err) {
//     console.error(err);
//   }
// }

async function getRegisteredPatients(req, res) {
  try {
    const user = req.user;
    console.log("user is", user);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const allPatients = await Patient.find({
      adminID: user._id,
    });

    return res.status(200).json(allPatients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function GetPatientById(req, res) {
  try {
    const patientId = req.params.id;
    const adminID = req.user._id;

    // Validate if the ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ error: "Invalid patient ID format" });
    }

    // Fetch patient data
    let patient;
    if (adminID) {
      patient = await Patient.findOne({
        _id: patientId,
        adminID: adminID,
      });
    }

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Fetch payment data
    const payments = await Payment.find({ patientId: patientId });
    // Transform payment data
    const paymentData = payments.map((payment) => ({
      _id: payment._id,
      paymentType: payment.paymentType,
      amount: payment.amount,
      paymentDate: payment.paymentDate,
    }));

    // Combine patient and payment data
    const data = {
      payments: paymentData,
      ...patient._doc, // Spread the patient document
    };

    // console.log(data);
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function UpdatePatientById(req, res) {
  try {
    const patientUpdates = req.body;
    const patient = await Patient.findById(req.params.id);
    const defaultImg =
      "https://res.cloudinary.com/df0mfuut3/image/upload/v1718384931/default%20image/user_yrev00.png";

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    let imageUrl = defaultImg;
    if (patientUpdates.image && patientUpdates.image.startsWith("data:image")) {
      const result = await cloudinary.uploader.upload(patientUpdates.image);
      imageUrl = result.secure_url;
    } else if (patientUpdates.image.startsWith("http")) {
      imageUrl = patientUpdates.image; // Directly use provided URL
    }
    Object.keys(patientUpdates).forEach((key) => {
      patient[key] = patientUpdates[key];
    });

    patient.image = imageUrl;

    const updatedPatient = await patient.save();
    return res.json({ status: "update success", patient: updatedPatient });
  } catch (error) {
    console.error("Error updating patient:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deletePatientById(req, res) {
  const adminID = req.user._id;

  try {
    await Payment.deleteMany({ patientId: req.params.id });
    const ExistingPatient = await Patient.findById(req.params.id);
    // console.log(ExistingPatient, req.user);
    if (!ExistingPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    if (ExistingPatient.adminID.toString() !== adminID.toString()) {
      return res.status(403).json({
        message: "Unauthorized: You can only delete patients you have created",
      });
    }

    // Remove the patient
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ status: "deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "internal server" });
  }
}

module.exports = {
  RegisterPatient,
  getRegisteredPatients,
  // updatePatients,
  GetPatientById,
  UpdatePatientById,
  deletePatientById,
};
