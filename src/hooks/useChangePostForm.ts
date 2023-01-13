import type { Dayjs } from 'dayjs';
import React, { useState } from 'react';

import { PostForm } from '../types/AppTypes';
import { calcStartTime } from '../utils/utils';

const postFormData: PostForm = {
  category: '',
  title: '',
  content: '',
  startDate: '',
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

  const handleChangeStartTime = (time: Dayjs | null, startTime: string) => {
    setPostForm({
      ...postForm,
      startTime: calcStartTime(startTime),
    });
  };

  const handleChangeStartDate = (startTime: string) => {
    setPostForm({
      ...postForm,
      startDate: startTime,
    });
  };

  return {
    postForm,
    handleChangeInputField,
    handleSubmitForm,
    handleChangeStartTime,
    handleChangeStartDate,
  };
}
