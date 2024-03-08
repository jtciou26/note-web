import React, { useState, useEffect } from 'react';
import { Card } from 'antd';

const { Meta } = Card;

function LinkPreview({ url }) {
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/metadata?url=${encodeURIComponent(url)}`
        );
        const data = await response.text();

        const isYouTubeVideo = isYouTubeURL(url);
        if (isYouTubeVideo) {
          const videoId = extractYouTubeVideoId(url);
          const videoThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

          setPreviewData({
            videoId,
            videoThumbnail
          });
        } else {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/html');
          const titleElement = doc.querySelector('title'); // chatgpt
          const descriptionElement = doc.querySelector(
            'meta[name="description"]'
          );
          const imageElement = doc.querySelector('meta[property="og:image"]');
          if (!titleElement || !descriptionElement || !imageElement) {
            throw new Error('Missing metadata');
          }

          const title = titleElement.textContent || '';
          const description = descriptionElement.getAttribute('content') || '';
          const image = imageElement.getAttribute('content') || '';

          setPreviewData({
            title,
            description,
            image
          });
        }
      } catch (error) {
        console.error('Failed to fetch link preview.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const isYouTubeURL = url => {
    return /(?:\/embed\/|\/watch\?v=|\/(?:embed\/|v\/|watch\?.*v=|youtu\.be\/|embed\/|v=))([^&?#]+)/.test(
      url
    );
  };

  const extractYouTubeVideoId = url => {
    const match = url.match(
      /(?:\/embed\/|\/watch\?v=|\/(?:embed\/|v\/|watch\?.*v=|youtu\.be\/|embed\/|v=))([^&?#]+)/
    );
    return match ? match[1] : '';
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!previewData) {
    return <p>Failed to fetch link preview.</p>;
  }

  const handleClick = () => {
    window.open(url, '_blank');
  };

  if (previewData.videoId) {
    return (
      <div onClick={handleClick} style={{ cursor: 'pointer' }}>
        <img src={previewData.videoThumbnail} alt="Video Thumbnail" />
      </div>
    );
  }

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Card
        style={{
          width: 640
        }}
        cover={<img alt="example" src={previewData.image} />}
      >
        <Meta title={previewData.title} description={previewData.description} />
      </Card>
    </div>
  );
}

export default LinkPreview;
