const Doctor = require("../models/doctor");

async function AddDoctor(req, res) {
  const body = req.body;
  if (!body || !body.name || !body.phone || !body.address) {
    return res.status(400).json({ msg: "all fields are req..." });
  }
  const doctor = await Doctor.create({
    name: body.name,
    specialty: body.specialty,
    email: body.email,
    phone: body.phone,
    address: body.address,
    availability: body.availability
  });
  return res.status(201).json({ msg: "doctor added", doctorId: doctor._id });
}

async function getDoctorDetails(req, res) {
  const allDoctors = await Doctor.find({});
  return res.json(allDoctors);
}

async function GetDoctorById(req, res) {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return res.status(404).json({ error: "doctor not found" });
  return res.json(doctor);
}

async function UpdateDoctorById(req, res) {
  try {
    const UpdatedData = req.body;
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: "doctor not found" });
    }
    Object.keys(UpdatedData).forEach((key) => {
      doctor[key] = UpdatedData[key];
    });

    const updatedDoctor = await doctor.save();
    return res.json({ status: "update success", doctor: updatedDoctor });
  } catch (error) {
    console.error("Error updating doctor:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteDoctorById(req, res) {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ status: "deleted successfully" });
}

module.exports = {
  AddDoctor,
  getDoctorDetails,
  GetDoctorById,
  UpdateDoctorById,
  deleteDoctorById,
};
