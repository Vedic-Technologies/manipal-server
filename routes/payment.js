const express = require("express");

const {
  GetAllPayment,
  GetPaymentById,
  handleNewPayment,
  UpdatePaymentById,
  deletePaymentById,
} = require("../controllers/payment");
const PatientPayment = require("../models/patientPaymentSchema");
const User = require("../models/user");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

// router.get("/all", restrictTo("superAdmin"), async (req, res) => {
//   const all = await PatientPayment.find({});
//   return res.json(all);
// });

router.route("/all_payments").get(GetAllPayment);

router.route("/add_payment").post(handleNewPayment);
// router.get("/update", async (req, res) => {
//   try {
//     const user = await User.findById("66001456d97f0e8e6039f26c");
//     console.log(user);
//     if (!user) {
//       console.error("user not found");
//     }

//     const result = await PatientPayment.updateMany({
//       adminID: "66001456d97f0e8e6039f26c",
//     });
//     console.log(`${result.Modified} patients updated with doctorId`);

//     const allPayments = await PatientPayment.find({
//       adminID: "66001456d97f0e8e6039f26c",
//     });
//     return res.json(allPayments);
//   } catch (err) {
//     console.error(err);
//   }
// });

router
  .route("/:id")
  .get(GetPaymentById)
  .patch(UpdatePaymentById)
  .delete(deletePaymentById);

module.exports = router;
