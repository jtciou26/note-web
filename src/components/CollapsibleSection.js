import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Typography } from 'antd';

const CollapsibleSection = ({ content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // Split content by lines and take the first 5 lines
  const initialContent = content
    .split('\n')
    .slice(0, 5)
    .join('\n');

  return (
    <div>
      <ReactMarkdown>{initialContent}</ReactMarkdown>
      {!expanded && content.split('\n').length > 5 && (
        <Typography.Link role="button" onClick={toggleExpanded}>
          展開全文
        </Typography.Link>
      )}
      {expanded && (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      )}
    </div>
  );
};

export default CollapsibleSection;
