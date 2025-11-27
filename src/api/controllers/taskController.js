const taskService = require("../../services/taskService");

// GET /api/tasks
async function listTasks(req, res) {
  try {
    const userId = req.user.userId;

    const tasks = await taskService.listUserTasks(userId);

    return res.json(tasks);
  } catch (err) {
    console.error("ListTasks error:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
}

// POST /api/tasks
async function createTask(req, res) {
  try {
    const userId = req.user.userId;
    const { title } = req.body;

    const task = await taskService.createTaskForUser(userId, title);

    return res.status(201).json(task);
  } catch (err) {
    console.error("CreateTask error:", err.message);

    if (err.message === "INVALID_TITLE") {
      return res.status(400).json({ error: "Invalid title" });
    }

    return res.status(500).json({ error: "Server error" });
  }
}

// PUT /api/tasks/:id
async function updateTask(req, res) {
  try {
    const userId = req.user.userId;
    const id = Number(req.params.id);

    const updated = await taskService.updateUserTask(userId, id, req.body);

    return res.json(updated);
  } catch (err) {
    console.error("UpdateTask error:", err.message);

    if (err.message === "INVALID_TITLE") {
      return res.status(400).json({ error: "Invalid title" });
    }
    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(500).json({ error: "Server error" });
  }
}

// DELETE /api/tasks/:id
async function deleteTask(req, res) {
  try {
    const userId = req.user.userId;
    const id = Number(req.params.id);

    await taskService.deleteUserTask(userId, id);

    return res.json({ success: true });
  } catch (err) {
    console.error("DeleteTask error:", err.message);

    if (err.message === "NOT_FOUND") {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  listTasks,
  createTask,
  updateTask,
  deleteTask
};
