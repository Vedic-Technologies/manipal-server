const Patient = require("../models/registerPatient");

async function RegisterPatient(req, res) {
  // console.log(req.body);
  const body = req.body;
  if (!body || !body.patientName || !body.gender || !body.age) {
    return res.status(400).json({ msg: "all fields are req..." });
  }
  const result = await Patient.create({
    patientName: body.patientName,
    gender: body.gender,
    age: body.age,
    dob: body.dob,
    contact: body.contact,
    bloodGroup: body.bloodGroup,
    weight: body.weight,
    height: body.height,
    complaint: body.complaint,
    referredTo: body.referredTo,
    relative: body.relative,
    address: body.address,
  });
  return res.status(201).json({ msg: "success", patient_id: result._id });
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
  await Patient.findByIdAndUpdate(req.params.id, {
    patientName: "changed now",
  });
  res.json({ status: "update success" });
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
