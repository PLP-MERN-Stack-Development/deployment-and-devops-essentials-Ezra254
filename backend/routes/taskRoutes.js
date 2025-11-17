import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} from '../controllers/taskController.js';
import { validateTask, validateTaskUpdate } from '../middleware/validation.js';

const router = express.Router();

// Get all tasks with optional filtering
router.get('/', getTasks);

// Get task statistics
router.get('/stats', getTaskStats);

// Get single task
router.get('/:id', getTask);

// Create new task
router.post('/', validateTask, createTask);

// Update task
router.put('/:id', validateTaskUpdate, updateTask);

// Delete task
router.delete('/:id', deleteTask);

export default router;

