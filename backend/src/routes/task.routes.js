import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask
} from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", verifyJWT, createTask);
router.get("/", verifyJWT, getMyTasks);
router.patch("/:id", verifyJWT, updateTask);
router.delete("/:id", verifyJWT, deleteTask);

export default router;