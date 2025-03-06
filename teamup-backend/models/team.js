const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    skills: [String],
    experience: String,
    lookingFor: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Team', TeamSchema);
