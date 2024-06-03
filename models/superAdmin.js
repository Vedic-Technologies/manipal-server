const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    contact: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    userType: {
      default: "superAdmin",
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const SuperAdmin = mongoose.model("superAdmin", superAdminSchema);

module.exports = SuperAdmin;
