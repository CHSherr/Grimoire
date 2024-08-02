const express = require("express");
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const router = express.Router();

// Protected route
router.get("/login", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;