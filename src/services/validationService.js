function validateEmail(email) {
  return typeof email === "string" && email.includes("@") && email.includes(".");
}

function validatePassword(password) {
  return typeof password === "string" && password.length >= 6;
}

function validateTaskTitle(title) {
  return typeof title === "string" && title.trim().length > 0;
}

module.exports = { validateEmail, validatePassword, validateTaskTitle };
