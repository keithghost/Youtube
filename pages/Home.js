import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ResultCard from '../components/ResultCard';
import '../styles/App.css';

const Home = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="home-page">
      <section className="hero">
        <h1>Convert YouTube Videos to MP3</h1>
        <p>Download your favorite music from YouTube in high quality MP3 format</p>
      </section>

      <section className="search-section">
        <SearchBar 
          setResults={setResults} 
          setLoading={setLoading} 
          setError={setError} 
        />
      </section>

      <section className="results-section">
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        <ResultCard result={results} />
      </section>

      <section className="how-to">
        <h2>How to Download YouTube to MP3</h2>
        <ol>
          <li>Enter a YouTube URL or search for a video</li>
          <li>Click the search button</li>
          <li>Click the download button when results appear</li>
          <li>Enjoy your MP3 file!</li>
        </ol>
      </section>
    </div>
  );
};

export default Home;
