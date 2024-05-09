const express = require("express");

const {
  handleNewPayment,
  GetAllPayment,
  deletePaymentById,
} = require("../controllers/payment");

const router = express.Router();

router.route("/all_payments").get(GetAllPayment);
router.route("/add_payment").post(handleNewPayment);

router
  .route("/:id")
  // .get(GetPaymentById);
  //   .patch(UpdatePatientById)
  .delete(deletePaymentById);

module.exports = router;
