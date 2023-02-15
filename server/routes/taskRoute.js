const {getTask, createTask, getTaskById, deleteTask} = require('../controller/taskController')
const router = require('express').Router();
const Task = require('../models/Task')
const {authenticateToken} = require("../middleware/authMiddleware")


router.get("/task",
authenticateToken,
 getTask);
router.post("/task",authenticateToken, createTask);
router.get("/task/:id",authenticateToken, getTaskById);
router.delete("/task/:id",authenticateToken, deleteTask);

module.exports = router;
