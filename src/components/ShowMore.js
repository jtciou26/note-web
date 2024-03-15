import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography } from 'antd';

const ShowMore = ({ content }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  function LinkRenderer(props) {
    return (
      <a href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    );
  }

  return (
    <React.Fragment>
      <Markdown remarkPlugins={[remarkGfm]} components={{ a: LinkRenderer }}>
        {expanded
          ? content
          : `${content.substring(0, 200)}${content.length > 200 ? '...' : ''}`}
      </Markdown>
      {content.length > 200 && (
        <Typography.Link role="button" onClick={toggleExpanded}>
          {expanded ? 'Show less' : 'Show More'}
        </Typography.Link>
      )}
    </React.Fragment>
  );
};

export default ShowMore;
