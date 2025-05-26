const Tasks = require("../models/taskModel");
const { validateTaskInfo } = require("../utils/validate");
const customError = require("../utils/customError");

const createTask = async (req, res, next) => {
  try {
    const { error, value: taskInfo } = validateTaskInfo(req.body);

    if (error) {
      throw customError(401, error.message);
    }
    const createdTask = await Tasks.create(taskInfo);
    const response = {
      message: "Task created successfully",
      data: createdTask,
    };

    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      throw customError(401, "Required query parameter missing");
    }

    const tasks = await Tasks.find({ user: userId });

    const response = {
      message: "Tasks retrieved",
      data: tasks,
    };

    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskUpdates = req.body;

    if (!id) {
      throw customError(401, "Task is required");
    }

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

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw customError(401, "Task id is required");
    }

    await Tasks.deleteOne({ _id: id });
    res.status(200).send({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
