const express = require("express");

const { handleNewPayment, GetAllPayment } = require("../controllers/payment");

const router = express.Router();

router.route("/add_payment").post(handleNewPayment);
router.route("/all_payments").get(GetAllPayment);

// router
//   .route("/:id")
//   .get(GetPatientById)
//   .patch(UpdatePatientById)
//   .delete(deletePatientById);

module.exports = router;
