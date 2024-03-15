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
          `${process.env.METADATA_API_URI}?url=${encodeURIComponent(url)}`
        );

        const data = await response.text();

        // Check if the URL ends with a common image file extension
        const isImage = /\.(jpeg|jpg|gif|png)$/i.test(url);

        if (isImage) {
          setPreviewData({
            image: url
          });
          setLoading(false);
          return;
        } else {
          // Parse metadata from HTML document
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
        console.error('Failed to fetch link preview:', error.message);
        setError('Failed to fetch link preview');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

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

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Card
        style={{
          width: 640
        }}
        cover={<img src={previewData.image} />}
      >
        <Meta title={previewData.title} description={previewData.description} />
      </Card>
    </div>
  );
}

export default LinkPreview;
