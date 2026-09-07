const jwt = require("jsonwebtoken");

function signToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET || "secreto_default",
    { expiresIn: "1h" }
  );
}

module.exports = {
  signToken
};
