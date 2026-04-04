import React, { useEffect } from 'react';

import { Gravatar } from '../components/Misc';

const Test = () => {
  useEffect(() => {
    document.title = 'test - Toegazer';
  });

  return <Gravatar />;
};
export default Test;
