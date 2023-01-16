import { useMutation } from '@tanstack/react-query';
import { TimePicker } from 'antd';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import Toggle from '../components/Toggle';
import ModalAccordionButton from '../components/common/ModalAccordionButton';
import TopNavBar from '../components/common/TopNavBar';
import useChangePostForm from '../hooks/useChangePostForm';
import { editMeeting, postMeeting } from '../services/api';
import { calcStartTime } from '../utils/utils';

export default function PostPage() {
  const { id } = useParams();

  const { postForm, handleChangeInputField } = useChangePostForm();
  const { title, content, link } = postForm;

  const { handleSubmit, register, control, setValue } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      category: '',
      startDate: '',
      startTime: '',
      duration: '',
      platform: '',
      link: '',
      content: '',
      maxNum: '',
      secret: false,
      password: '',
    },
  });

  const mutateEditMeeting = useMutation({
    mutationFn: editMeeting,
  });
  const mutatePostMeeting = useMutation({
    mutationFn: postMeeting,
  });

  const onSubmit = (postForm: FieldValues) => {
    id ? mutateEditMeeting.mutate({ id: +id, postForm }) : mutatePostMeeting.mutate(postForm);
  };

  return (
    <>
      <TopNavBar name={'post'} />
      <br />
      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>모임에 대해 설명해주세요!</h2>
        <ModalAccordionButton register={register} control={control} name={'category'} />
        <p>모임 생성 이후 변경이 불가능하니 신중하게 선택해주세요!</p>
        <label htmlFor="title">모임 이름</label>
        <input
          {...register('title', {
            required: true,
            maxLength: 20,
          })}
          type="text"
          id="title"
          placeholder="모임 이름을 입력해주세요 0/20"
          value={title}
          onChange={(e) => handleChangeInputField(e)}
        />
        <label htmlFor="content">소개</label>
        <input
          {...register('content', { required: true })}
          type="text"
          id="content"
          placeholder="모두가 즐거운 대화를 나눠요!"
          value={content}
          onChange={(e) => handleChangeInputField(e)}
        />
        <ModalAccordionButton register={register} control={control} name={'platform'} />

        <br />
        <br />

        <h2>모임은 어디에서 언제 시작하나요?</h2>
        <label htmlFor="link">링크</label>
        <input
          {...register('link', { required: false })}
          type="text"
          id="link"
          placeholder="링크를 입력해주세요"
          value={link}
          onChange={(e) => handleChangeInputField(e)}
        />
        <ModalAccordionButton register={register} control={control} name={'startDate'} />
        <label htmlFor="startTime">모임 시간</label>
        <Controller
          name="startTime"
          control={control}
          render={({ field: { onChange } }) => (
            <TimePicker
              {...register('startTime', { required: true })}
              use12Hours
              format="hh:mm a"
              onChange={(value, dateString) => {
                onChange(calcStartTime(dateString));
              }}
            />
          )}
        />
        <ModalAccordionButton register={register} control={control} name={'duration'} />

        <br />
        <br />

        <h2>모임은 몇 명이 어떻게 들어오나요?</h2>
        <ModalAccordionButton register={register} control={control} name={'maxNum'} />
        <p>모임 생성 이후 변경이 불가능하니 신중하게 선택해주세요!</p>
        <label htmlFor="secret">공개 설정</label>
        <Toggle register={register} setValue={setValue} />

        <button type="submit">{id ? '수정완료' : '작성완료'}</button>
      </form>
    </>
  );
}
