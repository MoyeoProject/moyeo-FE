import React, { useState } from 'react';

export default function useChangeSearchField() {
  const [searchField, setSearchField] = useState('');

  const handleChangeSearchField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setSearchField(value);
  };

  const handleClearInputField = () => {
    setSearchField('');
  };

  return {
    searchField,
    handleChangeSearchField,
    handleClearInputField,
  };
}
