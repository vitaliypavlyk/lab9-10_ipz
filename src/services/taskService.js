const { validateTaskTitle } = require("./validationService");
const taskRepo = require("../database/repositories/taskRepository");

async function createTaskForUser(userId, title) {
  if (!validateTaskTitle(title)) throw new Error("INVALID_TITLE");

  const task = await taskRepo.createTask({
    userId,
    title
  });

  return task;
}

async function listUserTasks(userId) {
  const tasks = await taskRepo.getTasksByUser(userId);
  return tasks;
}

async function updateUserTask(userId, id, data) {
  const title = data.title;
  const completed = Boolean(data.completed);

  if (!validateTaskTitle(title)) throw new Error("INVALID_TITLE");

  const updated = await taskRepo.updateTask({
    userId,
    id,
    title,
    completed
  });

  if (!updated) throw new Error("NOT_FOUND");
  return updated;
}

async function deleteUserTask(userId, id) {
  const ok = await taskRepo.deleteTask({ userId, id });
  if (!ok) throw new Error("NOT_FOUND");
  return true;
}

module.exports = {
  createTaskForUser,
  listUserTasks,
  updateUserTask,
  deleteUserTask
};
