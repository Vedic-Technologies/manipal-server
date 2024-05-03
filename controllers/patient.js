const Patient = require("../models/registerPatient");
const cloudinary = require("../cloudinary");

async function RegisterPatient(req, res) {
  // console.log(req.body);
  const body = req.body;
  if (!body || !body.patientName || !body.gender || !body.age) {
    return res.status(400).json({ msg: "all fields are req..." });
  }

  const uploadOptions = {
    folder: "patient_images",
    quality: "auto:good",
    format: "jpg",
  };
  cloudinary.uploader.upload(
    body.image,
    { ...uploadOptions },
    async (error, result) => {
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      try {
        // Create a new patient with image URL in database
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
        const savedPatient = await newPatient.save();
        res.status(201).json({ success: true, patient: savedPatient });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  );
}

async function getRegisteredPatients(req, res) {
  try {
    const re = await cloudinary.uploader.upload(
      "./controllers/pc.png"
      //  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg"
    );

    console.log(re);
  } catch (error) {
    console.error("An error occurred:", error);
  }

  // console.log(result);
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
