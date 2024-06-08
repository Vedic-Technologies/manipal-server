const express = require("express");

const {
  getAllusers,
  getUserById,
  deleteUserById,
  getPatient,
  getPatientById,
  deletePatientById,
  getPayments,
  getPaymentById,
  deletePaymentById,
  getAllStaffs,
  GetStaffById,
  deleteStaffById,
  getUsersWithPatientsAndPayments,
} = require("../controllers/analytics");

const router = express.Router();

router.get("/completeData", getUsersWithPatientsAndPayments);
router.get("/users/all", getAllusers);
router.get("/patients/all", getPatient);
router.get("/payments/all", getPayments);
router.get("/staffs/all", getAllStaffs);

router.get("/users/:id", getUserById);
router.get("/patients/:id", getPatientById);
router.get("/payments/:id", getPaymentById);
router.get("/staffs/:id", GetStaffById);


router.delete("/users/:id", deleteUserById);
router.delete("/patients/:id", deletePatientById);
router.delete("/payments/:id", deletePaymentById);
router.delete("/staffs/:id", deleteStaffById);




router
  .route("/:id")
  // .get(GetUserById)
  // .patch(UpdateUserById)
  // .delete(deleteUserById);

module.exports = router;
