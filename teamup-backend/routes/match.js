const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/find-matches/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const matches = await User.find({ skills: { $in: user.skills }, _id: { $ne: user._id } });
        res.json(matches);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
