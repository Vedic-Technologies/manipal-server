const mongoose = require("mongoose");

const patientPaymentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    patientinfo: {
      type: Object,
    },
    paymentType: {
      type: String,
      enum: ["daily", "15_days", "30_days"],
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
