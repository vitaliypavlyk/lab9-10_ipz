const db = require("../db");

async function createTask({ userId, title }) {
  const res = await db.query(
    "INSERT INTO tasks(user_id, title) VALUES($1,$2) RETURNING id, user_id, title, completed",
    [userId, title]
  );
  return res.rows[0];
}

async function getTasksByUser(userId) {
  const res = await db.query(
    "SELECT id, user_id, title, completed FROM tasks WHERE user_id=$1 ORDER BY id",
    [userId]
  );
  return res.rows;
}

async function updateTask({ id, userId, title, completed }) {
  const res = await db.query(
    "UPDATE tasks SET title=$1, completed=$2 WHERE id=$3 AND user_id=$4 RETURNING id, user_id, title, completed",
    [title, completed, id, userId]
  );
  return res.rows[0] || null;
}

async function deleteTask({ id, userId }) {
  const res = await db.query(
    "DELETE FROM tasks WHERE id=$1 AND user_id=$2",
    [id, userId]
  );
  return res.rowCount > 0;
}

module.exports = {
  createTask,
  getTasksByUser,
  updateTask,
  deleteTask
};
