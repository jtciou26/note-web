import React from 'react';
import { useHistory } from 'react-router-dom';

const Hashtag = ({ hashtag }) => {
  const history = useHistory();

  const handleHashtagClick = () => {
    const searchResultsPath = `/searchresults/${hashtag}?src=hashtag_click`;
    history.push(searchResultsPath);
  };

  return (
    <span
      style={{ cursor: 'pointer', color: '#1677ff' }}
      onClick={handleHashtagClick}
    >
      #{hashtag}
    </span>
  );
};

export default Hashtag;
