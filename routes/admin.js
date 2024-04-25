const express = require("express");

const {
  RegisterPatient,
  getRegisteredPatients,
} = require("../controllers/admin");

const router = express.Router();

router.route("/patient_registration").post(RegisterPatient);
router.route("/all_patients").get(getRegisteredPatients);

// router.route("/signup").post(CreateNewUser);

module.exports = router;
