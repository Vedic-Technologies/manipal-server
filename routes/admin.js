const express = require("express");

const {
  RegisterPatient,
  getRegisteredPatients,
  deletePatientById,
  UpdatePatientById,
  GetPatientById,
} = require("../controllers/admin");

const router = express.Router();

router.route("/patient_registration").post(RegisterPatient);
router.route("/all_patients").get(getRegisteredPatients);
router
  .route("/:id")
  .get(GetPatientById)
  .patch(UpdatePatientById) //  ye sab router hta ke patient wale router me daliye
  .delete(deletePatientById);

// router.route("/signup").post(CreateNewUser);

module.exports = router;
