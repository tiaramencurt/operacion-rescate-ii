const jwt = require("jsonwebtoken");

function signToken(user) {
  return jwt.sign(
    { role: user.role },
    process.env.JWT_SECRET || "super-secret",
    { expiresIn: "1h" }
  );
}

module.exports = {
  signToken
};
