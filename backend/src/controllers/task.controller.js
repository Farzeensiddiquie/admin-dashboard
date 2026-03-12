import Tasks from "../models/tasksSchema.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create Task
export const createTask = asyncHandler(async (req, res) => {

  const {
    title,
    description,
    status,
    priority,
    estimatedHours,
    category,
    dueDate
  } = req.body;

  if (!title || !description || !priority || !estimatedHours || !category || !dueDate) {
    throw new ApiError(400, "Required fields missing");
  }

  const task = await Tasks.create({
    title,
    description,
    status,
    priority,
    estimatedHours,
    category,
    dueDate,
    userId: req.user._id, // 🔒 Always from token
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

export const getMyTasks = asyncHandler(async (req, res) => {

  const tasks = await Tasks.find({ userId: req.user._id })
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

export const updateTask = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const task = await Tasks.findOne({
    _id: id,
    userId: req.user._id
  });

  if (!task) {
    throw new ApiError(404, "Task not found or unauthorized");
  }

  Object.assign(task, req.body);
  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

export const deleteTask = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const task = await Tasks.findOneAndDelete({
    _id: id,
    userId: req.user._id
  });

  if (!task) {
    throw new ApiError(404, "Task not found or unauthorized");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Task deleted successfully"));
});