const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { listUsers } = require("../controllers/adminController");

router.get("/all", authMiddleware, adminMiddleware, listUsers);

module.exports = router;