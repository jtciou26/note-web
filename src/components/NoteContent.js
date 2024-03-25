import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography } from 'antd';
import ImageModal from './ImageModal';

const NoteContent = ({ content }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageCache, setImageCache] = useState({});

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleImageHover = e => {
    const link = e.target.href;
    if (link && link.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
      setImageSrc(link);
      setShowModal(true);
    }
  };

  function LinkRenderer(props) {
    return (
      <a href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    );
  }

  return (
    <div onMouseOver={handleImageHover}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: LinkRenderer,
          img: ({ node, ...props }) => (
            <img style={{ maxWidth: '100%' }} {...props} />
          )
        }}
      >
        {expanded
          ? content
          : `${content.substring(0, 200)}${content.length > 200 ? '...' : ''}`}
      </Markdown>
      {content.length > 200 && (
        <Typography.Link role="button" onClick={toggleExpanded}>
          {expanded ? 'Show less' : 'Show More'}
        </Typography.Link>
      )}
      {showModal && (
        <ImageModal
          onClose={() => setShowModal(false)}
          width="400px"
          height="auto"
        >
          <img
            src={imageSrc}
            alt="Modal"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </ImageModal>
      )}
    </div>
  );
};

export default NoteContent;
