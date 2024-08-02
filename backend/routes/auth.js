const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  console.log(req.body);
  username = req.body.username;
  password = req.body.password;
  try {
    let user = await User.findOne({ name: username });
    if (user) {
      console.log("User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser = new User({
      name: username,
      password: hashedPassword,
    });
    console.log("Before saving user");
    await newUser.save();
    console.log("User saved");
    const payload = { user: { id: newUser._id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
    console.log("Token sent");
  } catch (err) {
    console.log("Error caught");
    res.status(500).json({ msg: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log(req.body);
  username = req.body.username;
  password = req.body.password;
  try {
    const user = await User.findOne({ name: username });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user._id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
