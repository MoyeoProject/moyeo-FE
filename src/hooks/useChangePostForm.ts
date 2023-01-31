import { useState } from 'react';

import { PostFormData } from '../types/AppTypes';

const postFormData: PostFormData = {
  title: '',
  content: '',
  link: '',
  profileMsg: '',
  username: '',
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

  return {
    postForm,
    handleChangeInputField,
  };
}
