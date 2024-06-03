const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    adminID: {
      type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    patientName: {
      type: String,
      require: true,
    },

    gender: {
      type: String,
      // require: true,
    },

    age: {
      type: Number,
      // require: true,
    },

    dob: {
      type: Date,
    },
    image: {
      type: String,
    },
    contact: {
      type: Number,
      default: 123456789,
    },

    email: {
      type: String,
      default: "NA",
    },
    occupation: {
      type: String,
      default: "NA",
    },
    HOPI: String,
    familyHistory: String,
    environmentalHistory: String,
    HR: String,
    BP: String,
    RR: String,
    examination: String,
    spine: String,
    specialTest: String,
    deformity: String,
    respiratoryType: String,
    breathSound: String,
    examinationExtremity: {
      sensory: {
        left: String,
        right: String,
      },
      motor: {
        left: String,
        right: String,
      },
    },
    gaitEvaluation: String,
    functionalAssessment: String,
    disability: String,
    treatmentGoal: String,

    tendonJerks: {
      Knee: String,
      ankle: String,
      planter: String,
      biceps: String,
      triceps: String,
      BR: String,
      babinski: String,
      clonus: String,
    },

    checkUp_status: {
      type: Boolean,
      default: false,
    },

    active: {
      type: Boolean,
      default: false,
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
    },

    height: {
      type: Number,
    },

    relative: {
      type: String,
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
