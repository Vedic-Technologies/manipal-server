const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  email: String,
  phone: Number,
  address: String,
  availability: {
    days: [String],
    hours: {
      start: String,
      end: String,
    },
  },
});

const Doctor = mongoose.model("doctor", doctorSchema);

module.exports = Doctor;
