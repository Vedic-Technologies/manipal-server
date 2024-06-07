const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Doctor's name is required"],
  },
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  dob: String,
  biography: String,
  image: String,
  gender: String,
  specialty: String,
  email: String,
  relationship: String,
  contact: {
    type: String,
    required: [true, "Contact number is required"],
  },
  emergencyContact: Number,
  address: {
    country: {
      type: String,
      default: "India",
    },

    state: {
      type: String,
    },

    district: {
      type: String,
    },

    pin_code: {
      type: String,
    },

    village: {
      type: String,
    },
  },
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
