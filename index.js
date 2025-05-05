require('dotenv').config();
const express = require('express');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'YouTube to MP3 Downloader' });
});

app.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    const { videos } = await yts(query);
    
    if (!videos || videos.length === 0) {
      return res.render('index', { 
        title: 'No results found', 
        error: 'No videos found for your search query' 
      });
    }
    
    res.render('results', { 
      title: 'Search Results', 
      videos: videos.slice(0, 10) 
    });
  } catch (error) {
    console.error(error);
    res.render('index', { 
      title: 'Error', 
      error: 'An error occurred while searching' 
    });
  }
});

app.get('/download', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url || !ytdl.validateURL(url)) {
      return res.status(400).json({
        creator: "Your Name",
        status: 400,
        success: false,
        error: "Invalid YouTube URL"
      });
    }
    
    const videoId = ytdl.getURLVideoID(url);
    const info = await ytdl.getInfo(url);
    
    const result = {
      creator: "Your Name",
      status: 200,
      success: true,
      result: {
        id: videoId,
        image: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
        title: info.videoDetails.title,
        downloadUrl: `${process.env.BASE_URL || req.protocol + '://' + req.get('host')}/download/mp3?id=${videoId}`
      }
    };
    
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      creator: "Your Name",
      status: 500,
      success: false,
      error: "Internal server error"
    });
  }
});

app.get('/download/mp3', async (req, res) => {
  try {
    const { id } = req.query;
    const url = `https://www.youtube.com/watch?v=${id}`;
    
    if (!id || !ytdl.validateID(id)) {
      return res.status(400).send('Invalid video ID');
    }
    
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    
    res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
    ytdl(url, { quality: 'highestaudio', filter: 'audioonly' })
      .pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error downloading the audio');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
