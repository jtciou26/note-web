import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography } from 'antd';

const ShowMore = ({ content }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Markdown remarkPlugins={[remarkGfm]}>
        {expanded
          ? content
          : `${content.substring(0, 200)}${content.length > 200 ? '...' : ''}`}
      </Markdown>

      {content.length > 200 && (
        <Typography.Link role="button" onClick={toggleExpanded}>
          {expanded ? 'Show less' : 'Show More'}
        </Typography.Link>
      )}
    </div>
  );
};

export default ShowMore;
