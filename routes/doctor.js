const express = require("express");

const {
  AddDoctor,
  getDoctorDetails,
  GetDoctorById,
  UpdateDoctorById,
  deleteDoctorById,
} = require("../controllers/doctor");

const router = express.Router();

router.route("/all_doctors").get(getDoctorDetails);
router.route("/add_doctor").post(AddDoctor);
router
  .route("/:id")
  .get(GetDoctorById)
  .patch(UpdateDoctorById)
  .delete(deleteDoctorById);

module.exports = router;
