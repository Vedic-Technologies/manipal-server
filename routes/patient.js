const express = require("express");

const {
  RegisterPatient,
  getRegisteredPatients,
  deletePatientById,
  UpdatePatientById,
  GetPatientById,
} = require("../controllers/patient");

const router = express.Router();

router.route("/all_patients").get(getRegisteredPatients);
router.route("/patient_registration").post(RegisterPatient);
router
  .route("/:id")
  .get(GetPatientById)
  .patch(UpdatePatientById) 
  .delete(deletePatientById);

module.exports = router;
