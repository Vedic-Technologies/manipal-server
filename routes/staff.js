const express = require("express");
const {
  GetAllStaffs,
  GetStaffById,
  UpdateStaffById,
  deleteStaffById,
  CreateNewStaff,
  GetAllStaffsWithoutAdmin,
} = require("../controllers/staff");
const {
  checkForAuthentication,
  blocked,
  restrictTo,
} = require("../middlewares/auth");

const router = express.Router();
// router.get("/allStaffs", restrictTo("superAdmin"), GetAllStaffsWithoutAdmin);

router.get("/", GetAllStaffs);

router.post("/register", CreateNewStaff);

router
  .route("/:id")
  .get(blocked, GetStaffById)
  .patch(blocked, UpdateStaffById)
  .delete(deleteStaffById);

module.exports = router;
