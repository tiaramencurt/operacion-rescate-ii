const express = require("express");
const { listUsers } = require("../controllers/adminController");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/all", adminMiddleware, listUsers);

module.exports = router;
