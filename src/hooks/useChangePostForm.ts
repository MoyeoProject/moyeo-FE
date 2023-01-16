import { useState } from 'react';

type PostFormData = {
  title: string;
  content: string;
  link: string;
};

const postFormData: PostFormData = {
  title: '',
  content: '',
  link: '',
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
