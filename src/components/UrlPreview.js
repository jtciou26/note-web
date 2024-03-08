import React, { useState } from 'react';
import LinkPreview from '../components/LinkPreview';
import { Button, Input } from 'antd';

const UrlInput = () => {
  const [url, setUrl] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    setSubmittedUrl(url);
    setUrl('');
  };

  const handleChange = event => {
    setUrl(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      {submittedUrl && <LinkPreview url={submittedUrl} />}
    </div>
  );
};

export default UrlInput;
