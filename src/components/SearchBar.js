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
      allowClear
      onSearch={handleSearch}
      style={{
        width: '180px',
        marginLeft: 'auto'
      }}
    />
  );
};

export default SearchBar;
