const express = require("express");
const {
  getGoals,
  createGoal,
  updateGoal,
  getGoalById,
  deleteGoal,
} = require("../controllers/goalController");
const { verifyAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(verifyAuth);
router.route("/").get(getGoals).post(createGoal);
router.route("/:id").put(updateGoal).get(getGoalById).delete(deleteGoal);

module.exports = router;
