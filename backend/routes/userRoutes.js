const express = require("express");
const router = express.Router();
const User = require("../models/User");
const ClaimHistory = require("../models/ClaimHistory");

// Get all users
router.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Add new user
router.post("/users", async (req, res) => {
    const { name } = req.body;
    const user = new User({ name });
    await user.save();
    res.json(user);
});

// Claim random points
router.post("/claim/:userId", async (req, res) => {
    const userId = req.params.userId;
    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    await User.findByIdAndUpdate(
        userId, 
        { $inc: { totalPoints: points } 
    });


    const history = new ClaimHistory({
        userId: user._id,
        points
    });
    await history.save();

    res.json({ user, claimedPoints: points });
});

// Leaderboard (sorted)
router.get("/leaderboard", async (req, res) => {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
});

// Get claim history (optional)
router.get("/history", async (req, res) => {
    const history = await ClaimHistory.find().populate("userId", "name").sort({ claimedAt: -1 });
    res.json(history);
});

module.exports = router;
