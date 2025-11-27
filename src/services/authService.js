const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateEmail, validatePassword } = require("./validationService");
const userRepo = require("../database/repositories/userRepository");

async function register({ name, email, password }) {
  if (!validateEmail(email)) throw new Error("INVALID_EMAIL");
  if (!validatePassword(password)) throw new Error("INVALID_PASSWORD");

  const existing = await userRepo.findByEmail(email);
  if (existing) throw new Error("EMAIL_EXISTS");

  const hash = await bcrypt.hash(password, 10);

  const user = await userRepo.createUser({
    name,
    email,
    passwordHash: hash
  });

  return user;
}

async function login({ email, password }) {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("INVALID_CREDENTIALS");

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) throw new Error("INVALID_CREDENTIALS");

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
}

module.exports = { register, login };
