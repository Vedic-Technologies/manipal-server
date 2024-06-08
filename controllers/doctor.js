const Doctor = require("../models/doctor");
const cloudinary = require("../cloudinary");
const fs = require("fs");
const path = require("path");

async function AddDoctor(req, res) {
  const body = req.body;
  const adminID = req.user._id;

  if (!adminID) {
    return res.status(400).json({ msg: "invalid token" });
  }
  if (!body || !body.name || !body.contact || !body.fullName) {
    return res.status(400).json({ msg: "all fields are required" });
  }

  try {
    const { image } = req.body;
    let imageUrl;

    // Check if the request has base64 image data
    if (image) {
      // Upload base64 image to Cloudinary
      const result = await cloudinary.uploader.upload(image, {
        folder: "doctors",
      });
      imageUrl = result.secure_url;
    }

    const doctor = await Doctor.create({
      ...body,
      image: imageUrl,
      adminID,
    });
    return res
      .status(201)
      .json({ msg: "doctor added", doctorId: doctor._id, data: doctor });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

async function getDoctorDetails(req, res) {
  // const { id } = req.params;
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
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ status: "deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "doctor not found", error: error });
  }
}

module.exports = {
  AddDoctor,
  getDoctorDetails,
  GetDoctorById,
  UpdateDoctorById,
  deleteDoctorById,
};
