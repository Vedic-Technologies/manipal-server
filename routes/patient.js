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
const User = require("../models/user");

const router = express.Router();

router.use("/shoulder", shoulderRouter);

router.get("/all", async (req, res) => {
  const all = await Patient.find({});
  return res.send(all);
});

router.route("/all_patients").get(getRegisteredPatients);

// router.get("/all_patients/update", async (req, res) => {
//   try {
//     const user = await User.findById("66001456d97f0e8e6039f26c");
//     console.log(user);
//     if (!user) {
//       console.error("user not found");
//     }

//     const result = await Patient.updateMany({
//       adminID: "66001456d97f0e8e6039f26c",
//     });
//     console.log(`${result} patients updated with doctorId`);

//     const allPatients = await Patient.find({
//       adminID: "66001456d97f0e8e6039f26c",
//     });
//     return res.json(allPatients);
//   } catch (err) {
//     console.error(err);
//   }
// });

router.route("/patient_registration").post(RegisterPatient);
router
  .route("/:id")
  .get(GetPatientById)
  .patch(UpdatePatientById)
  .delete(deletePatientById);

module.exports = router;
