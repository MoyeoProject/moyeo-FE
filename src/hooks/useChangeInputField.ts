import React, { useState } from 'react';

export default function useChangeInputField() {
  const [inputField, setInputField] = useState('');

  const handleChangeInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setInputField(value);
  };

  const handleClearInputField = () => {
    setInputField('');
  };

  return {
    inputField,
    handleChangeInputField,
    handleClearInputField,
  };
}
