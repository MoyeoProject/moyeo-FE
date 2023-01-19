import { useMutation } from '@tanstack/react-query';
import { TimePicker } from 'antd';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import Toggle from '../components/Toggle';
import ModalAccordionButton from '../components/common/ModalAccordionButton';
import TopNavBar from '../components/common/TopNavBar';
import useChangePostForm from '../hooks/useChangePostForm';
import { editMeeting, postMeeting } from '../services/api';
import { loadItem } from '../services/storage';
import {
  FormAlert,
  FormContents,
  FormLabel,
  FormTitle,
  FormWrap,
  InputField,
  TimeInputField,
} from '../styles/FormStyle';
import { calcStartTime } from '../utils/utils';

export default function PostPage() {
  const { id } = useParams();

  const tmp = loadItem('currPost');
  const currPost = tmp && JSON.parse(tmp);

  const { postForm, handleChangeInputField } = useChangePostForm();
  const { title, content, link } = postForm;

  const defaultValues =
    id && currPost
      ? currPost
      : {
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
        };

  const { handleSubmit, register, control, setValue } = useForm<FieldValues>({ defaultValues });

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
      <FormWrap>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>모임에 대해 설명해주세요!</FormTitle>
          <FormContents>
            <ModalAccordionButton register={register} control={control} name={'category'} />
            <FormAlert>모임 생성 이후 변경이 불가능하니 신중하게 선택해주세요!</FormAlert>
            <FormLabel htmlFor="title">모임 이름</FormLabel>
            <InputField
              {...register('title', { required: true })}
              type="text"
              id="title"
              maxLength={20}
              placeholder={currPost ? currPost.title : '모임 이름을 입력해주세요'}
              value={title}
              onChange={(e) => handleChangeInputField(e)}
            />
            <FormLabel htmlFor="content">소개</FormLabel>
            <InputField
              {...register('content', { required: true })}
              type="text"
              id="content"
              placeholder={currPost ? currPost.content : '모두가 즐거운 대화를 나눠요!'}
              value={content}
              onChange={(e) => handleChangeInputField(e)}
            />
            <ModalAccordionButton register={register} control={control} name={'platform'} />
          </FormContents>

          <FormTitle>모임은 어디에서 언제 시작하나요?</FormTitle>
          <FormContents>
            <FormLabel htmlFor="link">링크</FormLabel>
            <InputField
              {...register('link', { required: false })}
              type="text"
              id="link"
              placeholder={currPost ? currPost.link : '링크를 입력해주세요'}
              value={link}
              onChange={(e) => handleChangeInputField(e)}
            />
            <ModalAccordionButton register={register} control={control} name={'startDate'} />
            <FormLabel htmlFor="startTime">모임 시간</FormLabel>
            <Controller
              name="startTime"
              control={control}
              render={({ field: { onChange } }) => (
                <TimeInputField>
                  <TimePicker
                    {...register('startTime', { required: true })}
                    use12Hours
                    format="hh:mm a"
                    placeholder="시간을 선택해주세요"
                    onChange={(value, dateString) => {
                      onChange(calcStartTime(dateString));
                    }}
                  />
                </TimeInputField>
              )}
            />
            <ModalAccordionButton register={register} control={control} name={'duration'} />
          </FormContents>

          <FormTitle>모임은 몇 명이 어떻게 들어오나요?</FormTitle>
          <FormContents>
            <ModalAccordionButton register={register} control={control} name={'maxNum'} />
            <FormAlert>모임 생성 이후 변경이 불가능하니 신중하게 선택해주세요!</FormAlert>
            <Toggle register={register} setValue={setValue} />
          </FormContents>

          <button type="submit">{id ? '수정완료' : '작성완료'}</button>
        </form>
      </FormWrap>
    </>
  );
}
