const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("Name email");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Protected route", user });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
