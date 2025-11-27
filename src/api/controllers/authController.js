const authService = require("../../services/authService");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Викликаємо сервіс
    const user = await authService.register({ name, email, password });

    res.status(201).json(user);
  } catch (err) {
    console.error("Register error:", err.message);

    if (err.message === "EMAIL_EXISTS") {
      return res.status(409).json({ error: "Email already exists" });
    }
    if (err.message === "INVALID_EMAIL") {
      return res.status(400).json({ error: "Invalid email format" });
    }
    if (err.message === "INVALID_PASSWORD") {
      return res.status(400).json({ error: "Password must be min 6 chars" });
    }

    return res.status(500).json({ error: "Server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const result = await authService.login({ email, password });

    return res.status(200).json(result);
  } catch (err) {
    console.error("Login error:", err.message);

    if (err.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { register, login };
