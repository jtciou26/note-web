import React, { useEffect, useState } from 'react';
import LinkPreview from '../components/LinkPreview';
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

const Preview = () => {
  useEffect(() => {
    document.title = 'Preview - Toegazer';
  });

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

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      // Trigger handleUrlChange when 'Enter' key is pressed
      handleSubmit(event);
    }
  };

  return (
    <Wrapper>
      <Input
        placeholder="Enter URL"
        value={url}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleSubmit}>Submit</Button>
      <li>https://www.youtube.com/watch?v=68zFgY2bLu8</li>
      <li>https://www.joseal.app</li>
      <li>https://medium.com</li>
      <li>https://imgur.com/gallery/z3Nfndh</li>
      <li>https://i.imgur.com/cNx5ldQ.jpeg</li>
      <li>
        https://dev.to/rahulj9a/how-to-build-simple-link-preview-without-any-library-in-js-2j84
      </li>
      {submittedUrl && <LinkPreview url={submittedUrl} />}
    </Wrapper>
  );
};

export default Preview;
