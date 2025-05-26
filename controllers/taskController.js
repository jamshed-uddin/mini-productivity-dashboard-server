const Tasks = require("../models/taskModel");
const { validateTaskInfo } = require("../utils/validate");
const customError = require("../utils/customError");

// @desc create task
// @route POST/api/tasks
// @access private
const createTask = async (req, res, next) => {
  try {
    const { error, value: taskInfo } = validateTaskInfo(req.body);

    if (error) {
      throw customError(400, error.message);
    }
    const createdTask = await Tasks.create({ ...taskInfo, user: req.user._id });
    const response = {
      message: "Task created successfully",
      data: createdTask,
    };

    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
};

// @desc get tasks
// @route GET/api/tasks
// @access private
const getTasks = async (req, res, next) => {
  try {
    const tasks = await Tasks.find({ user: req.user._id }).populate("goal");

    const response = {
      message: "Tasks retrieved",
      data: tasks,
    };

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

// @desc get task
// @route GET/api/tasks/:id
// @access private
const getTaskById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const task = await Tasks.findById(id).populate("goal");
    if (!task) {
      throw customError(404, "Task not found");
    }

    res.status(200).send({ message: "Task retrieved", data: task });
  } catch (error) {
    next(error);
  }
};

// @desc update task
// @route PUT/api/tasks/:id
// @access private
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw customError(400, "Task id is required");
    }

    const taskUpdates = req.body;

    const updatedTask = await Tasks.findByIdAndUpdate(id, taskUpdates, {
      new: true,
    });

    if (!updatedTask) {
      throw customError(404, "Task not found");
    }

    res.status(200).send({ message: "Task updated", data: updatedTask });
  } catch (error) {
    next(error);
  }
};

// @desc delete task
// @route DELETE/api/tasks/:id
// @access private
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw customError(400, "Task id is required");
    }

    const deletedTask = await Tasks.deleteOne({ _id: id });

    if (!deletedTask) {
      throw customError(404, "Task not found");
    }
    res.status(200).send({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
