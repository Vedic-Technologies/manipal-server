const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    adminID: {
      type: String,
      // require: true,
    },
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
      // unique: true,
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
      type: String,
      default: "staff",
      // require: true,
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model("staff", staffSchema);

module.exports = Staff;
