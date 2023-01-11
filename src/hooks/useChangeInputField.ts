import React, { useState } from 'react';

export default function useChangeInputField() {
  const [inputField, setInputField] = useState('');

  const handleChangeinputField = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    handleChangeinputField,
    handleClearInputField,
  };
}
