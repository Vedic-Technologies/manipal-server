const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      require: true,
    },

    gender: {
      type: String,
      require: true,
    },

    age: {
      type: Number,
      require: true,
    },

    DOB: {
      date: {
        type: Number,
        default: 12,
      },
      month: {
        type: Number,
        default: 12,
      },
      year: {
        type: Number,
        default: 12,
      },
    },

    contact: {
      type: Number,
      default: 123456789,
      //   require: true,
    },

    email: {
      type: String,
      default: "NA",
    },

    IdProof: {
      IdType: {
        type: String,
        default: "NA",
      },
      Id: {
        type: String,
        default: "NA",
      },
    },

    bloodGroup: {
      type: String,
      default: "NA",
    },

    weight: {
      type: Number,
      default: "NA",
    },

    height: {
      type: Number,
      default: "NA",
    },

    relative: {
      type: String,
      default: "NA",
    },

    complaint: {
      type: String,
      // require: true,
    },
    referredTo: {
      type: String,
      default: "NA",
    },

    address: {
      country: {
        type: String,
        default: "India",
      },

      state: {
        type: String,
        // required: true,
      },

      district: {
        type: String,
        // required: true,
      },

      pin_code: {
        type: String,
        default: "NA",
      },

      village: {
        type: String,
        default: "NA",
      },
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;
