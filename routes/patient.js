const express = require("express");

const {
  RegisterPatient,
  getRegisteredPatients,
  deletePatientById,
  UpdatePatientById,
  // updatePatients,
  GetPatientById,
} = require("../controllers/patient");
const shoulderRouter = require("../routes/shoulder");
const Patient = require("../models/registerPatient");

const router = express.Router();

router.use("/shoulder", shoulderRouter);

router.get("/all", async (req, res) => {
  const all = await Patient.find({})
  return res.send(all);
});

router.route("/all_patients").get(getRegisteredPatients);
// router.route("/all_patients/update").get(updatePatients);
router.route("/patient_registration").post(RegisterPatient);
router
  .route("/:id")
  .get(GetPatientById)
  .patch(UpdatePatientById)
  .delete(deletePatientById);

module.exports = router;
