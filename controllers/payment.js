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
  try {
    const allPayments = await Payment.find({}).populate({
      path: "patientId",
      model: "patient",
      select: "patientName _id contact image active", // Choose the fields you want to include
    });

    console.log(allPayments);

    // Optionally, enhance data format here if needed
    const paymentsWithPatientInfo = allPayments.map((payment) => ({
      _id: payment._id,
      patientId: payment.patientId._id,
      paymentType: payment.paymentType,
      amount: payment.amount,
      paymentDate: payment.paymentDate,
      patient: {
        // _id: payment.patientId._id,
        name: payment.patientId?.patientName,
        active: payment.patientId?.active,
        contact: payment.patientId?.contact,
        image: payment.patientId?.image,
      },
    }));

    return res.json(paymentsWithPatientInfo);
  } catch (error) {
    console.error("Failed to retrieve payments:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
}

// async function GetPaymentById(req, res) {
//   const patient = await Patient.findById(req.params.id);

//   const payment = await Payment.find({ patientId: req.params.id });
//   // console.log(payment)
//   if (!patient) return res.status(404).json({ error: "user not found" });

//   const data = {
//     ...patient._doc,
//     ...payment,
//   };
//   console.log(data);
//   return res.json(data);
// }

async function GetPaymentById(req, res) {
  try {
    const payment = await Payment.findById(req.params.id);
    return res.json(payment);
  } catch (error) {
    return res.status(404).json({ error: "payment not found" });
  }
}

async function UpdatePaymentById(req, res) {
  try {
    const paymentUpdates = req.body;
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ error: "Patient not found" });
    }
    Object.keys(paymentUpdates).forEach((key) => {
      payment[key] = paymentUpdates[key];
    });

    const updatedPayment = await payment.save();
    return res.json({ status: "update success", payment: updatedPayment });
  } catch (error) {
    console.error("Error updating patient:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deletePaymentById(req, res) {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ status: "deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "payment not found" });
  }
}

module.exports = {
  GetAllPayment,
  GetPaymentById,
  handleNewPayment,
  UpdatePaymentById,
  deletePaymentById,
};
