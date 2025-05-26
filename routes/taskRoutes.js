const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/taskController");
const { verifyAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(verifyAuth);
router.route("/").get(getTasks).post(createTask);
router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = router;
