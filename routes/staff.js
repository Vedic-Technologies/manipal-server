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
router.get("/", GetAllStaffs);

router.post("/register", CreateNewStaff);

router
  .route("/:id")
  .get( GetStaffById)
  .patch( UpdateStaffById)
  .delete(deleteStaffById);

module.exports = router;
