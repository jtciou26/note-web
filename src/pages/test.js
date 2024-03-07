import React from 'react';
import ReactDom from 'react-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Test = () => {
  const markdown1 = `Just a link: www.nasa.gov.`;
  const markdown2 = `# Hi, *Pluto*!`;

  return (
    <React.Fragment>
      <Markdown remarkPlugins={[remarkGfm]}>{markdown1}</Markdown>
    </React.Fragment>
  );
};

export default Test;
