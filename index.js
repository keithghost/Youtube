require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/download', (req, res) => {
  res.sendFile(__dirname + '/public/download.html');
});
app.get('/yt', (req, res) => {
  res.sendFile(__dirname + '/public/yt.html');
});

app.get('/tiktokstalk', (req, res) => {
  res.sendFile(__dirname + '/public/tiktokstalk.html');
});

app.get('/gpt', (req, res) => {
  res.sendFile(__dirname + '/public/gpt.html');
});

app.get('/tiktok', (req, res) => {
  res.sendFile(__dirname + '/public/tiktok.html');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
