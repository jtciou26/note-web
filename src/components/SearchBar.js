import React from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';

const { Search } = Input;

const SearchBar = () => {
  const history = useHistory();

  const handleSearch = value => {
    if (value.trim() !== '') {
      history.push(`/searchresults/${value}`);
    }
  };

  return (
    <Search
      placeholder="input search text"
      onSearch={handleSearch}
      style={{
        width: 200,
        marginLeft: 'auto'
      }}
    />
  );
};

export default SearchBar;
