require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Routes
const youtubeRouter = require('./routes/youtube');
//const tiktokRouter = require('./routes/tiktok');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.use('/api/youtube', youtubeRouter);
//app.use('/api/tiktok', tiktokRouter);

// Homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
