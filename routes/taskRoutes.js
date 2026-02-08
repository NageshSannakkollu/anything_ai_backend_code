const express = require("express")
const {createTask,getAllTasks,getTaskBySpecificId,deleteTask,updateTask} = require("../controller/tasksController")
// const authenticateToken = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/api/v1/tasks",createTask)
router.get("/api/v1/tasks",getAllTasks)
router.get("/api/v1/tasks/:id",getTaskBySpecificId)
router.delete("/api/v1/tasks/delete/:id",deleteTask)
router.patch("/api/v1/tasks/update/:id",updateTask)   

module.exports = router;