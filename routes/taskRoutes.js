const express = require("express");
const Task = require("../models/task");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// Create a new task
router.post("/", protect, async (req, res) => {
  try {
    //Create a new instance of the Task model with the data from the request body
    const task = new Task(req.body);

    //Save the task to the database and wait for it to complete
    const savedTask = await task.save();

    //Send a success response with status code 201
    res.status(201).json(savedTask);
  } catch (err) {
    //If an error occurs, send a response with status code 400 and the error message as JSON
    res.status(400).json({ message: err.message });
  }
});

// Fetch all tasks
router.get("/", protect, async (req, res) => {
  try {
    //Retrieve all tasks from the database
    const tasks = await Task.find();

    // Send a success response with status code 200
    res.status(200).json(tasks);
  } catch (err) {
    //If an error occurs, send a response with status code 500
    res.status(500).json({ message: err.message });
  }
});

// Fetch a task by ID
router.get("/:id", protect, async (req, res) => {
  try {
    // find the task by the ID provided in the request parameters
    const task = await Task.findById(req.params.id);

    // If the task is not found, send a response with status code 404
    if (!task) return res.status(404).json({ message: "Task not found" });

    // If the task is found, send a success response with status code 200
    res.status(200).json(task);
  } catch (err) {
    //If an error occurs, send a response with status code 500
    res.status(500).json({ message: err.message });
  }
});

// Update a task status
router.put("/:id", protect, async (req, res) => {
  try {
    //destructure the status field from the request body
    const { status } = req.body;

    //Check if the status is one of the allowed values
    if (!["pending", "in-progress", "completed"].includes(status)) {
      //If the status is not one of the allowed values, send a response with status code 400
      return res.status(400).json({ message: "Invalid status value" });
    }

    //Find the task by ID and update the status field
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    //If the task is not found, send a response with status code 404
    if (!task) return res.status(404).json({ message: "Task not found" });
    // If the task is successfully updated, send a 200 response
    res.status(200).json(task);
  } catch (err) {
    //If an error occurs, send a response with status code 500
    res.status(500).json({ message: err.message });
  }
});

// Delete a task
router.delete("/:id", protect, async (req, res) => {
  try {
    //delete the task by the ID provided in the request parameters
    const task = await Task.findByIdAndDelete(req.params.id);

    //If the task is not found, send a response with status code 404
    if (!task) return res.status(404).json({ message: "Task not found" });

    //If the task is successfully deleted, send a response with status code 200
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    //If an error occurs, send a response with status code 500
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
