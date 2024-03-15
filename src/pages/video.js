import React, { useEffect, useState } from 'react';
import RwdYoutube from '../components/RwdYoutube';
import styled from 'styled-components';
import { Button, Input } from 'antd';

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  input {
    width: 75%;
    margin: 16px 4px;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border: 1px solid #f5f4f0;
  border-radius: 10px;
  padding-bottom: ${props =>
    props.aspectRatio ? `${props.aspectRatio}%` : '56.25%'};
  height: 0;
`;

export default function Video() {
  useEffect(() => {
    document.title = 'Video - Toegazer';
  });

  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [loadClicked, setLoadClicked] = useState(false);

  const handleUrlChange = event => {
    setUrl(event.target.value);
    setError(''); // Clear any previous errors when the user types
    setLoadClicked(false); // Reset loadClicked when user types a new URL
  };

  const extractVideoId = url => {
    var videoRegex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(videoRegex);
    return match && match[7].length == 11 ? match[7] : false;
  };

  const extractPlaylistId = url => {
    const playlistRegex = url.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/);
    return playlistRegex ? playlistRegex[2] : null;
  };

  const validateYoutubeUrl = url => {
    const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|.*[?&]list=)|youtu\.be\/|y\/|\/v\/|\/e\/|watch\?.*(?:v|&v|embed|feature=player_embedded&v)=)([^"'&?\/\s]{11}|[^"'&?\/\s]{18,})/;
    const match = url.match(youtubeRegex);
    return !!match; // Returns true if URL is valid
  };

  const handleLoadClick = () => {
    if (validateYoutubeUrl(url)) {
      const videoId = extractVideoId(url);
      const playlistId = extractPlaylistId(url);

      if (videoId) {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`;
        setUrl(embedUrl);
      } else if (playlistId) {
        // Playlist URL
        const embedUrl = `https://www.youtube.com/embed?listType=playlist&list=${playlistId}`;
        setUrl(embedUrl);
      }

      setError('');
      setLoadClicked(true);
    } else {
      // Handle invalid URL or show an error message
      setError('Invalid YouTube URL');
      setLoadClicked(false);
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      // Trigger handleUrlChange when 'Enter' key is pressed
      handleLoadClick(event);
    }
  };

  return (
    <Wrapper>
      <Input
        placeholder="貼上 YouTube 網址"
        value={url}
        onChange={handleUrlChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleLoadClick}>Load</Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>https://www.youtube.com/embed/68zFgY2bLu8</p>
      <VideoContainer aspectRatio={loadClicked ? null : 56.25}>
        {/* Pass the updated URL to the RwdYoutube component */}
        {loadClicked && <RwdYoutube src={url} />}
      </VideoContainer>
    </Wrapper>
  );
}
