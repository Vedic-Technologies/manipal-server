const express = require("express");
const {
  GetAllSuperAdmin,
  GetAdminById,
  UpdateAdminById,
  deleteAdminById,
  CreateNewSuperAdmin,
  ValidateSuperAdminLogin,
} = require("../controllers/superAdmin");
const { checkForAuthentication, restrictTo } = require("../middlewares/auth");

const router = express.Router();

// Login route does not require authentication not using router.route
router.post("/login", ValidateSuperAdminLogin);

// applying middleware for below routes
router.use(checkForAuthentication);
router.use(restrictTo("superAdmin"));

router.post("/", CreateNewSuperAdmin);
router.get("/", GetAllSuperAdmin);

router
  .route("/:id")
  .get(GetAdminById)
  .patch(UpdateAdminById)
  .delete(deleteAdminById);

module.exports = router;
