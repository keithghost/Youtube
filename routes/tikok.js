const express = require('express');
const router = express.Router();
const { TikTokScraper } = require('tiktok-scraper');

// TikTok Download
router.get('/dl', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({
        status: false,
        message: 'URL parameter is required'
      });
    }

    const video = await TikTokScraper.getVideoMeta(url, { 
      sessionList: ['sid_tt=YOUR_SESSION_ID'] // Optional session ID
    });

    const response = {
      status: true,
      creator: "Your Name",
      result: {
        title: video.collector[0].text,
        caption: video.collector[0].text,
        nowm: video.collector[0].downloadUrl,
        mp3: video.collector[0].musicMeta.playUrl,
        thumbnail: video.collector[0].imageUrl
      }
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error processing TikTok URL'
    });
  }
});

module.exports = router;
