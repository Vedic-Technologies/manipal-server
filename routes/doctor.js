const express = require("express");
// const upload = require("../middlewares/multer");

const {
  AddDoctor,
  getDoctorDetails,
  GetDoctorById,
  UpdateDoctorById,
  deleteDoctorById,
} = require("../controllers/doctor");

const router = express.Router();

router.post("/add_doctor", AddDoctor);
router.get("/all_doctor", getDoctorDetails);
router
  .route("/:id")
  .get(GetDoctorById)
  .patch(UpdateDoctorById)
  .delete(deleteDoctorById);

module.exports = router;
