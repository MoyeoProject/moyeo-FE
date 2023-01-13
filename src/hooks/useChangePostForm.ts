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
  duration: null,
  platform: '',
  link: '',
  maxNum: null,
  secret: false,
  password: '',
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
      [name]:
        name === 'maxNum'
          ? +value.replace('명', '')
          : name === 'duration'
          ? +value.replace('시간', '')
          : value,
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

  const handleChangePassword = (password: string) => {
    setPostForm({
      ...postForm,
      password,
    });
  };

  const handleChangeSecret = (secret: boolean) => {
    setPostForm({
      ...postForm,
      secret,
      password: secret ? postForm.password : '',
    });
  };

  return {
    postForm,
    handleChangeInputField,
    handleSubmitForm,
    handleChangeStartTime,
    handleChangeStartDate,
    handleChangePassword,
    handleChangeSecret,
  };
}
