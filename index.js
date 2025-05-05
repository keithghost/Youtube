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
app.get('/coding', (req, res) => {
  res.sendFile(__dirname + '/public/coding.html');
});

app.get('/stalker', (req, res) => {
  res.sendFile(__dirname + '/public/stalker.html');
});

app.get('/sports', (req, res) => {
  res.sendFile(__dirname + '/public/sports.html');
});

app.get('/search', (req, res) => {
  res.sendFile(__dirname + '/public/search.html');
});

app.get('/yt', (req, res) => {
  res.sendFile(__dirname + '/public/yt.html');
});

app.get('/tiktokstalk', (req, res) => {
  res.sendFile(__dirname + '/public/tiktokstalk.html');
});
app.get('/twitter-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/twitter-stalk.html');
});

app.get('/youtube-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/youtube-stalk.html');
});

app.get('/npm-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/npm-stalk.html');
});

app.get('/ip-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/ip-stalk.html');
});

app.get('/whatsapp-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/whatsapp-stalk.html');
});
app.get('/github-repo-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/github-repo-stalk.html');
});

app.get('/github-user-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/github-user-stalk.html');
});

app.get('/country-info-stalk', (req, res) => {
  res.sendFile(__dirname + '/public/country-info-stalk.html');
});
app.get('/gpt', (req, res) => {
  res.sendFile(__dirname + '/public/gpt.html');
});
app.get('/ai', (req, res) => {
  res.sendFile(__dirname + '/public/ai.html');
});

app.get('/tiktok', (req, res) => {
  res.sendFile(__dirname + '/public/tiktok.html');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
