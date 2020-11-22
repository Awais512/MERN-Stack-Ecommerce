import React from 'react';

const SearchCategoriesForm = ({ keyword, setKeyword }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <input
      type='search'
      value={keyword}
      onChange={handleSearch}
      className='form-control mb-4'
      placeholder='Search Categories'
    />
  );
};

export default SearchCategoriesForm;
