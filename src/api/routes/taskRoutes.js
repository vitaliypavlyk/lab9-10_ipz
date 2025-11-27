const express = require("express");
const router = express.Router();
const authMiddleware = require("../authMiddleware");
const taskController = require("../controllers/taskController");

router.use(authMiddleware);

router.get("/", taskController.listTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
