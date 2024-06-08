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
const { getUsersWithPatientsAndPayments } = require("../controllers/user");
const analyticsRouter = require("../routes/analytics");

const router = express.Router();

// Login route does not require authentication
router.post("/login", ValidateSuperAdminLogin);

// applying middleware for below routes
router.use(checkForAuthentication);
router.use(restrictTo("superAdmin"));
// route for analytics
router.use("/analytics", restrictTo("superAdmin"), analyticsRouter);

// routes related to super admin
router.post("/", CreateNewSuperAdmin);
router.get("/", GetAllSuperAdmin);

router
  .route("/:id")
  .get(GetAdminById)
  .patch(UpdateAdminById)
  .delete(deleteAdminById);

module.exports = router;
