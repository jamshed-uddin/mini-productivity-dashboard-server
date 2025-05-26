const Goals = require("../models/goalModel");
const Tasks = require("../models/taskModel");
const customError = require("../utils/customError");
const { validateGoalInfo } = require("../utils/validate");

// @desc create goal
// @route POST/api/goals
// @access private
const createGoal = async (req, res, next) => {
  try {
    const { error, value: goalInfo } = validateGoalInfo(req.body);

    if (error) {
      throw customError(400, error.message);
    }

    const createdGoal = await Goals.create({
      ...goalInfo,
      user: req.user._id,
    });

    res.status(201).send({
      message: "Goal created successfully",
      data: createdGoal,
    });
  } catch (error) {
    next(error);
  }
};

// @desc get goals
// @route GET/api/goals
// @access private
const getGoals = async (req, res, next) => {
  try {
    const goals = await Goals.find({ user: req.user._id });

    res.status(200).send({
      message: "Goals retrieved successfully",
      data: goals,
    });
  } catch (error) {
    next(error);
  }
};

// @desc get goal
// @route GET/api/goals/:id
// @access private
const getGoalById = async (req, res, next) => {
  try {
    const goal = await Goals.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).lean();
    const associateTasks = await Tasks.find({ goal: goal._id });

    if (!goal) {
      throw customError(404, "Goal not found");
    }

    res.status(200).send({
      message: "Goal retrieved successfully",
      data: { ...goal, tasks: associateTasks },
    });
  } catch (error) {
    next(error);
  }
};

// @desc update goal
// @route PUT/api/goals/:id
// @access private
const updateGoal = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw customError(400, "Task id is required");
    }
    const goalUpdates = req.body;

    const updatedGoal = await Goals.findOneAndUpdate(
      { _id: id, user: req.user._id },
      goalUpdates,
      { new: true }
    );

    if (!updatedGoal) {
      throw customError(404, "Goal not found or not authorized");
    }

    res.status(200).send({
      message: "Goal updated successfully",
      data: updatedGoal,
    });
  } catch (error) {
    next(error);
  }
};

// @desc delete goal
// @route DELETE/api/goals/:id
// @access private
const deleteGoal = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw customError(400, "Task id is required");
    }

    const deletedGoal = await Goals.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deletedGoal) {
      throw customError(404, "Goal not found");
    }

    res.status(200).send({
      message: "Goal deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGoal,
  getGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
};
