const Payment = require("../models/patientPaymentSchema");
const Patient = require("../models/registerPatient");

async function handleNewPayment(req, res) {
  const body = req.body;
  if (!body || !body.patientId || !body.paymentType || !body.amount) {
    return res.status(400).json({
      msg: "All fields are required and amount should be greater than 0",
    });
  }

  try {
    // Attempt to create the payment
    const result = await Payment.create({
      patientId: body.patientId,
      paymentType: body.paymentType,
      amount: body.amount,
      paymentDate: body.paymentDate,
    });

    return res.status(201).json({ msg: "success", patient_id: result._id });
  } catch (error) {
    // Handle the error
    if (error.name === "ValidationError") {
      return res.status(400).json({ msg: "Validation error: id not found " });
    } else {
      console.error("Error creating payment:", error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
}

async function GetAllPayment(req, res) {
  const allPayments = await Payment.find({});
  return res.json(allPayments);
}

module.exports = {
  handleNewPayment,
  GetAllPayment,
};
