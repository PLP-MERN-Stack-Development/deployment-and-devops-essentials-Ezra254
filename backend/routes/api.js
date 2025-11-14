const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/Task');

// In-memory task store for development (when MongoDB is unavailable)
let inMemoryTasks = [];
let nextId = 1;

const isMongoConnected = () => mongoose.connection.readyState === 1;

// Get all tasks
router.get('/tasks', async (req, res, next) => {
  try {
    let tasks;
    if (isMongoConnected()) {
      tasks = await Task.find().sort({ createdAt: -1 });
    } else {
      tasks = inMemoryTasks.sort((a, b) => b.createdAt - a.createdAt);
    }
    res.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
});

// Get single task
router.get('/tasks/:id', async (req, res, next) => {
  try {
    let task;
    if (isMongoConnected()) {
      task = await Task.findById(req.params.id);
    } else {
      task = inMemoryTasks.find(t => t._id === req.params.id);
    }
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }
    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

// Create task
router.post('/tasks', async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;
    
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    let task;
    if (isMongoConnected()) {
      task = await Task.create({
        title,
        description,
        completed: completed || false,
      });
    } else {
      // In-memory storage
      task = {
        _id: String(nextId++),
        title,
        description,
        completed: completed || false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryTasks.push(task);
    }

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

// Update task
router.put('/tasks/:id', async (req, res, next) => {
  try {
    let task;
    if (isMongoConnected()) {
      task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    } else {
      const idx = inMemoryTasks.findIndex(t => t._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({
          success: false,
          message: 'Task not found',
        });
      }
      task = { ...inMemoryTasks[idx], ...req.body, updatedAt: new Date() };
      inMemoryTasks[idx] = task;
    }

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

// Delete task
router.delete('/tasks/:id', async (req, res, next) => {
  try {
    let task;
    if (isMongoConnected()) {
      task = await Task.findByIdAndDelete(req.params.id);
    } else {
      const idx = inMemoryTasks.findIndex(t => t._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({
          success: false,
          message: 'Task not found',
        });
      }
      [task] = inMemoryTasks.splice(idx, 1);
    }

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

