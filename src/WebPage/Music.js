import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';
import './Music.css'; // Assuming you have a CSS file for styling

const Music = () => {
  const [tracks, setTracks] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const audioRefs = useRef([]);
  const audioRef = useRef([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');




 const handleSearch = async () => {
  if (query.trim() === '') {
    setError('Please enter an artist or song name.');
    setTracks([]); // Optionally clear existing results
    return;
  }

  setError('');
  setLoading(true);

  try {
    setError(''); // Clear error when valid
    const res = await axios.get(
      `https://corsproxy.io/?https://api.deezer.com/search?q=${query}`
    );
    setTracks(res.data.data);
  } catch (err) {
    setError('Oops! Something went wrong.');
  }

  finally{
     setTimeout(() => {
      setLoading(false);
    }, 3000);
  }
};

 

useEffect(() => {
  const home = async () => {
  setError('');
  setLoading(true);

  try {
    setError('');
    const res = await axios.get(
      `https://corsproxy.io/?https://api.deezer.com/search?q=wizkid`
    );

    setTracks(res.data.data);
  } catch (err) {
    setError('Oops! Something went wrong.');
  }

  finally{
     setTimeout(() => {
      setLoading(false);
    });
  }
};

home();
}, []);

  return (
  <div className="main-container">
    <div className='music-title'>
    <div className='music-header'>
      <h2>Yoyoyo Pop Music</h2>
    </div>
    </div>
  <div className="search-bar">

    <input
      type="text"
      placeholder="Search for artist or song..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />

    <button onClick={handleSearch}>Search</button>

    {loading && <div className="spinner"></div>}


    {/* {error && <p className="error-msg">{error}</p>} */}

  </div>

  <div className='track-list'>
  {tracks.map((track, index) => (
    <div key={track.id} className="track-card">
          <img src={track.album.cover_medium} alt={track.title} />
          <h4>{track.title}</h4>
          <p>{track.artist.name}</p>

          <audio
            controls
            ref={(el) => (audioRef.current[index] = el)}
            src={track.preview}
            onPlay={() => {
              audioRef.current.forEach((audio, idx) => {
                if (audio && idx !== index) {
                  audio.pause();
                  audio.currentTime = 0;
                }
              });
            }}
          />
        </div>
  ))}
  </div>

  
  <div className="track-list">
    {tracks.length === 0 ? (
      <p className='no-tex-msg'>Check your internet connection!</p>
    ) : (
      tracks.map((track, index) => (
        <div key={track.id} className="track-card">
          <img src={track.album.cover_medium} alt={track.title} />
          <h4>{track.title}</h4>
          <p>{track.artist.name}</p>

          <audio
            controls
            ref={(el) => (audioRefs.current[index] = el)}
            src={track.preview}
            onPlay={() => {
              audioRefs.current.forEach((audio, idx) => {
                if (audio && idx !== index) {
                  audio.pause();
                  audio.currentTime = 0;
                }
              });
            }}
          />
        </div>
      ))
    )}
  </div>
</div>

  );
};

export default Music;
