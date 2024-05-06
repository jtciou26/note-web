import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography } from 'antd';
import ImageModal from './ImageModal';
import Hashtag from './Hashtag';

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

  function HashtagRenderer(props) {
    const content = props.children[0].props.children;
    const hashtagRegex = /#(\w+)/g; // Regex to match hashtags
    const hashtags = content.match(hashtagRegex);

    if (hashtags && hashtags.length > 0) {
      // 增加一個log 確認是否有抓到hashtag
      console.log(hashtags);
      return (
        <>
          {hashtags.map((hashtag, index) => (
            <Hashtag key={index} hashtag={hashtag.substring(1)} /> // Remove the '#' symbol
          ))}
        </>
      );
    } else {
      // If no hashtags are found, render the content as is
      return content;
    }
  }

  return (
    <div onMouseOver={handleImageHover}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: LinkRenderer,
          img: ({ node, ...props }) => (
            <img style={{ maxWidth: '100%' }} {...props} />
          ),
          p(props) {
            const { children } = props;
            const content = React.Children.toArray(children).join('');
            const hashtagRegex = /#(\w+)/g;
            if (hashtagRegex.test(content)) {
              return (
                <p>
                  {content.split(hashtagRegex).map((part, index) => {
                    if (index % 2 === 0) {
                      return part;
                    } else {
                      const hashtag = part.substring(0);
                      return <Hashtag key={index} hashtag={hashtag} />;
                    }
                  })}
                </p>
              );
            }
            return <p>{children}</p>;
          }
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
