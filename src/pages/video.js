import React, { useEffect, useState } from 'react';
import RwdYoutube from '../components/RwdYoutube'
import styled from 'styled-components';

const Wrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    input { 
        width: 75%;
        margin-bottom: 16px;
        margin-right: 4px;
    }
`;

export default function Video() {

  useEffect(() => {
    document.title = 'Video'
});

  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loadClicked, setLoadClicked] = useState(false);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
    setError(''); // Clear any previous errors when the user types
    setLoadClicked(false); // Reset loadClicked when user types a new URL
  };

  const extractVideoId = (url) => {
    // Regular expression to match the video ID from YouTube URLs
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  };

  const validateYoutubeUrl = (url) => {
    const videoId = extractVideoId(url);
    return !!videoId; // Returns true if videoId is not null or undefined
  };

  const handleLoadClick = () => {
    if (validateYoutubeUrl(url)) {
    // Extract the video ID from the provided URL
        const videoId = extractVideoId(url);
      // Concatenate the video ID with the base URL
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      // Update the URL in the state
        setUrl(embedUrl);
        setError('');
        setLoadClicked(true);
    } else {
      // Handle invalid URL or show an error message
      setError('Invalid YouTube URL');
      setLoadClicked(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Trigger handleUrlChange when 'Enter' key is pressed
      handleLoadClick(event);
    }
  };

  return (
    <Wrapper>
      <input
        type='text'
        placeholder="貼上 YouTube 網址"
        value={url}
        onChange={handleUrlChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleLoadClick}>Load</button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Pass the updated URL to the RwdYoutube component */}
      {loadClicked && <RwdYoutube src={url} />}
    </Wrapper>
  );
}
