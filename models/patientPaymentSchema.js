const mongoose = require("mongoose");

const patientPaymentSchema = new mongoose.Schema(
  {
    adminID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    paymentType: {
      type: String,
      // enum: ["daily", "15_days", "30_days"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const PatientPayment = mongoose.model("PatientPayment", patientPaymentSchema);

module.exports = PatientPayment;
