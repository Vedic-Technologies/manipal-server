const Patient = require("../models/registerPatient");

async function RegisterPatient(req, res) {
  // console.log(req.body);
  const body = req.body;
  if (
    !body ||
    !body.patientName ||
    !body.gender ||
    !body.age ||
    !body.address.state ||
    !body.address.district ||
    !body.address.state ||
    !body.complaint
  ) {
    return res.status(400).json({ msg: "all fields are req..." });
  }
  const result = await Patient.create({
    patientName: body.patientName,
    gender: body.gender,
    age: body.age,
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

module.exports = { RegisterPatient, getRegisteredPatients };
