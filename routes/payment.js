const express = require("express");

const {
  GetAllPayment,
  GetPaymentById,
  handleNewPayment,
  UpdatePaymentById,
  deletePaymentById,
} = require("../controllers/payment");

const router = express.Router();

router.route("/all_payments").get(GetAllPayment);
router.route("/add_payment").post(handleNewPayment);

router
  .route("/:id")
  .get(GetPaymentById)
  .patch(UpdatePaymentById)
  .delete(deletePaymentById);

module.exports = router;
