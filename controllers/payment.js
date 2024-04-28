const Payment = require("../models/patientPaymentSchema");
const Patient = require("../models/registerPatient");

async function handleNewPayment(req, res) {
  const body = req.body;
  if (!body || !body.patient || !body.paymentType || !body.amount) {
    return res.status(400).json({ msg: "all fields are req..." });
  }
  const result = await Payment.create({
    patient: body.patient,
    paymentType: body.paymentType,
    amount: body.amount,
    paymentDate: body.paymentDate,
  });
  return res.status(201).json({ msg: "success", patient_id: result._id });
}

async function GetAllPayment(req, res) {
  const allPayments = await Payment.find({});
  return res.json(allPayments);
}


module.exports = {
  handleNewPayment,
  GetAllPayment,
};
