import React, { useState, useEffect } from 'react';
import { Card } from 'antd';

const { Meta } = Card;

function LinkPreview({ url }) {
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(true);

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
            image: url,
            title: 'an image file'
          });
          setLoading(false);
          return;
        } else {
          // Parse metadata from HTML document
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/html');

          const ogTitle = doc.querySelector('meta[property="og:title"]');
          const ogDes = doc.querySelector('meta[property="og:description"]');
          const ogImage = doc.querySelector('meta[property="og:image"]');

          console.log(ogTitle);
          console.log(ogDes);
          console.log(ogImage);

          if (!ogTitle || !ogDes || !ogImage) {
            throw new Error('Missing metadata');
          }

          const title = ogTitle.getAttribute('content') || '';
          const description = ogDes.getAttribute('content') || '';
          const image = ogImage.getAttribute('content') || '';

          setPreviewData({
            title,
            description,
            image
          });
        }
      } catch (error) {
        console.error('Failed to fetch link preview:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!previewData) {
    return <p>Failed to fetch link preview.</p>;
  }

  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <Card
      onClick={handleClick}
      style={{
        width: 640
      }}
      cover={
        <img
          src={previewData.image}
          style={{ maxHeight: '400px', width: '639px', objectFit: 'cover' }}
        />
      }
    >
      <Meta title={previewData.title} description={previewData.description} />
    </Card>
  );
}

export default LinkPreview;
