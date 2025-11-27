const db = require("../db");

async function createUser({ name, email, passwordHash }) {
  const res = await db.query(
    "INSERT INTO users(name, email, password_hash) VALUES($1,$2,$3) RETURNING id, name, email",
    [name, email, passwordHash]
  );
  return res.rows[0];
}

async function findByEmail(email) {
  const res = await db.query("SELECT * FROM users WHERE email=$1", [email]);
  return res.rows[0] || null;
}

async function findById(id) {
  const res = await db.query("SELECT id, name, email FROM users WHERE id=$1", [id]);
  return res.rows[0] || null;
}

module.exports = {
  createUser,
  findByEmail,
  findById
};
