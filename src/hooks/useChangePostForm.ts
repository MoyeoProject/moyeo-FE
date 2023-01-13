import React, { useState } from 'react';

import { PostForm } from '../types/AppTypes';

const postFormData: PostForm = {
  category: '',
  title: '',
  content: '',
  startTime: '',
  duration: '',
  platform: '',
  link: '',
  maxNum: null,
  secret: false,
  secretPassword: null,
};

export default function useChangePostForm() {
  const [postForm, setPostForm] = useState(postFormData);

  const handleChangeInputField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, id },
    } = event;
    setPostForm({
      ...postForm,
      [id]: value,
    });
  };

  const handleSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name } = event.target;
    const { value } = event.target[name];

    setPostForm({
      ...postForm,
      [name]: value,
    });
  };

  return {
    postForm,
    handleChangeInputField,
    handleSubmitForm,
  };
}
