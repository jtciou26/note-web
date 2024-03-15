import React, { useEffect } from 'react';

import Gravatar from '../components/Gravatar';

const Test = () => {
  useEffect(() => {
    document.title = 'test - Toegazer';
  });

  return <Gravatar />;
};
export default Test;
