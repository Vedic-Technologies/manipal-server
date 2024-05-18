const Patient = require("../models/registerPatient");
const Payment = require("../models/patientPaymentSchema");
const cloudinary = require("../cloudinary");
const mongoose = require("mongoose");

async function RegisterPatient(req, res) {
  const body = req.body;
  if (!body || !body.patientName || !body.gender || !body.age) {
    return res.status(400).json({ msg: "all fields are req..." });
  }

  try {
    let imageUrl = null;
    if (body.image) {
      const result = await cloudinary.uploader.upload(body.image);
      imageUrl = result.secure_url;
    }
    const newPatient = new Patient({
      patientName: body.patientName,
      gender: body.gender,
      age: body.age,
      dob: body.dob,
      image: imageUrl,
      contact: body.contact,
      email: body.email,
      occupation: body.occupation,
      HOPI: body.HOPI,
      familyHistory: body.familyHistory,
      environmentalHistory: body.environmentalHistory,
      HR: body.HR,
      BP: body.BP,
      RR: body.RR,
      examination: body.examination,
      spine: body.spine,
      specialTest: body.specialTest,
      deformity: body.deformity,
      respiratoryType: body.respiratoryType,
      breathSound: body.breathSound,
      examinationExtremity: body.examinationExtremity,
      gaitEvaluation: body.gaitEvaluation,
      functionalAssessment: body.functionalAssessment,
      disability: body.disability,
      treatmentGoal: body.treatmentGoal,
      tendonJerks: body.tendonJerks,
      checkUp_status: body.checkUp_status,
      active: body.active,
      IdProof: body.IdProof,
      bloodGroup: body.bloodGroup,
      weight: body.weight,
      height: body.height,
      relative: body.relative,
      complaint: body.complaint,
      referredTo: body.referredTo,
      address: body.address,
    });
    newPatient
      .save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          newPatient: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } catch (error) {
    res.json({ error: error });
  }
}

async function getRegisteredPatients(req, res) {
  const allPatients = await Patient.find({});
  return res.json(allPatients);
}

async function GetPatientById(req, res) {
  try {
    const patientId = req.params.id;

    // Validate if the ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ error: "Invalid patient ID format" });
    }

    // Fetch patient data
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Fetch payment data
    const payments = await Payment.find({ patientId: patientId });
    if (!payments) {
      return res
        .status(404)
        .json({ error: "No payments found for the patient" });
    }

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

    console.log(data);
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

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    Object.keys(patientUpdates).forEach((key) => {
      patient[key] = patientUpdates[key];
    });

    const updatedPatient = await patient.save();
    return res.json({ status: "update success", patient: updatedPatient });
  } catch (error) {
    console.error("Error updating patient:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deletePatientById(req, res) {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ status: "deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Patient not found" });
  }
}

module.exports = {
  RegisterPatient,
  getRegisteredPatients,
  GetPatientById,
  UpdatePatientById,
  deletePatientById,
};
