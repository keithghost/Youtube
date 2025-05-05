document.addEventListener('DOMContentLoaded', function() {
  // Tab switching
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // YouTube Download
  document.getElementById('youtube-download').addEventListener('click', async () => {
    const url = document.getElementById('youtube-url').value.trim();
    if (!url) return alert('Please enter a YouTube URL');
    
    try {
      const response = await fetch(`/api/youtube/mp3?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (data.success) {
        const result = data.result;
        const resultsDiv = document.getElementById('youtube-results');
        resultsDiv.innerHTML = `
          <div class="result-item">
            <img src="${result.image}" width="200">
            <h3>${result.title}</h3>
            <a href="${result.downloadUrl}" class="download-btn">Download MP3</a>
          </div>
        `;
      } else {
        alert('Error: ' + (data.message || 'Failed to process YouTube URL'));
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while processing your request');
    }
  });

  // YouTube Search
  document.getElementById('youtube-search').addEventListener('click', async () => {
    const query = document.getElementById('youtube-url').value.trim();
    if (!query) return alert('Please enter a search term');
    
    try {
      const response = await fetch(`/api/youtube/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.status) {
        const resultsDiv = document.getElementById('youtube-results');
        resultsDiv.innerHTML = data.results.map(video => `
          <div class="result-item">
            <img src="${video.thumbnail}" width="120">
            <h3>${video.title}</h3>
            <p>Duration: ${video.duration}</p>
            <button class="download-btn" onclick="useYouTubeUrl('${video.url}')">Use This Video</button>
          </div>
        `).join('');
      } else {
        alert('Error: ' + (data.message || 'Failed to search YouTube'));
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while searching');
    }
  });

  // TikTok Download
  // TikTok Download
document.getElementById('tiktok-download').addEventListener('click', async () => {
  const url = document.getElementById('tiktok-url').value.trim();
  if (!url) return alert('Please enter a TikTok URL');
  
  try {
    const response = await fetch(`/api/tiktok/dl?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    if (data.status) {
      const result = data.result;
      const resultsDiv = document.getElementById('tiktok-results');
      resultsDiv.innerHTML = `
        <div class="result-item">
          <img src="${result.thumbnail}" width="200">
          <h3>${result.title}</h3>
          <p>${result.caption}</p>
          <a href="${result.nowm}" class="download-btn">Download SD</a>
          ${result.hd ? `<a href="${result.hd}" class="download-btn">Download HD</a>` : ''}
          ${result.mp3 ? `<a href="${result.mp3}" class="download-btn">Download Audio</a>` : ''}
        </div>
      `;
    } else {
      alert('Error: ' + (data.message || 'Failed to process TikTok URL'));
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while processing your request');
  }
});
// Helper function for YouTube search results
function useYouTubeUrl(url) {
  document.getElementById('youtube-url').value = url;
}
