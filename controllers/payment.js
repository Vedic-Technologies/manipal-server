const Payment = require("../models/patientPaymentSchema");


async function Payment(req, res) {   
    const body = req.body;
    if (!body || !body.paymentType || !body.amount || !body.paymentDate) {
      return res.status(400).json({ msg: "all fields are req..." });
    }
    const result = await Patient.create({
        paymentType: body.paymentType,
        amount: body.amount,
        paymentDate: body.paymentDate,      
    });
    return res.status(201).json({ msg: "success", patient_id: result._id });
  }

  module.exports = {
    Payment,  
  };