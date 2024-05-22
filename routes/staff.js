const express = require("express");
const {
  GetAllStaffs,
  GetStaffById,
  UpdateStaffById,
  deleteStaffById,
  CreateNewStaff,
  // ValidateStaffLogin,
} = require("../controllers/staff");

const router = express.Router();

router.route("/").get(GetAllStaffs);

router.route("/signup").post(CreateNewStaff);

// router.route("/login").post(ValidateStaffLogin);

router
  .route("/:id")
  .get(GetStaffById)
  .patch(UpdateStaffById)
  .delete(deleteStaffById);

module.exports = router;
