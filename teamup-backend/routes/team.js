const express = require('express');
const Team = require('../models/Team');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { members, skills, experience, lookingFor } = req.body;
        const newTeam = new Team({ members, skills, experience, lookingFor });
        await newTeam.save();
        res.json({ message: "Team created successfully", team: newTeam });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
