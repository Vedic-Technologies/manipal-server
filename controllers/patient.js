const Patient = require("../models/registerPatient");
const cloudinary = require("../cloudinary");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

async function RegisterPatient(req, res) {
  // console.log(req)
  const file = req.files.photo
  console.log(file, "5488888888888")
  const body = req.body;
  //  if (!body || !body.patientName || !body.gender || !body.age) {
  //     return res.status(400).json({ msg: "all fields are req..." });
  //   }

  console.log(file);
  cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
    const newPatient = new Patient({
      patientName: body.patientName,
      gender: body.gender,
      age: body.age,
      dob: body.dob,
      image: result.secure_url,
      contact: body.contact,
      email: body.email,
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
  });
}

async function getRegisteredPatients(req, res) {
  const allPatients = await Patient.find({});
  return res.json(allPatients);
}

async function GetPatientById(req, res) {
  const patient = await Patient.findById(req.params.id);
  if (!patient) return res.status(404).json({ error: "user not found" });
  return res.json(patient);
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
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ status: "deleted successfully" });
}

module.exports = {
  RegisterPatient,
  getRegisteredPatients,
  GetPatientById,
  UpdatePatientById,
  deletePatientById,
};
