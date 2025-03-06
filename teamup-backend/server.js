const express = require('express');
const connectDB = require('./config');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/match', require('./routes/match'));
app.use('/team', require('./routes/team'));
app.use('/chat', require('./routes/chat'));

app.listen(5000, () => console.log('Server running on port 5000'));
