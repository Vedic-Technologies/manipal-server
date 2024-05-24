const express = require("express");

const {
  registerShoulderProblems,
  getAllShoulderProblems,
  getShoulderProblemById,
  updateShoulderProblemById,
  deleteshoulderProblemById,
} = require("../controllers/shoulder");

const router = express.Router();

router.route("/").get(getAllShoulderProblems);
router.route("/register_problem").post(registerShoulderProblems);
router
  .route("/:id")
  .get(getShoulderProblemById)
  .patch(updateShoulderProblemById)
  .delete(deleteshoulderProblemById);

module.exports = router;
