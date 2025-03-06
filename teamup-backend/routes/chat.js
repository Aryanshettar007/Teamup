const express = require('express');
const Chat = require('../models/Chat');
const router = express.Router();

router.post('/send', async (req, res) => {
    try {
        const { sender, team, message } = req.body;
        const newMessage = new Chat({ sender, team, message });
        await newMessage.save();
        res.json({ message: "Message sent", chat: newMessage });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
