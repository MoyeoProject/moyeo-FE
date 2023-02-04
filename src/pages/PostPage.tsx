import { useMutation } from '@tanstack/react-query';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import Toggle from '../components/Toggle';
import ModalAccordionButton from '../components/common/ModalAccordionButton';
import TopNavBar from '../components/common/TopNavBar';
import useChangePostForm from '../hooks/useChangePostForm';
import { deleteMeeting, editMeeting, postMeeting } from '../services/api';
import { loadItem, saveItem } from '../services/storage';
import { ButtonWrap, DeleteButton, PostButton } from '../styles/ButtonStyle';
import {
  FieldWrap,
  FileLabel,
  FormAlert,
  FormContents,
  FormLabel,
  FormTitle,
  FormWrap,
  InputField,
  TextAreaField,
  TextLength,
  TimeInputField,
} from '../styles/FormStyle';
import { calcStartTime } from '../utils/utils';

export default function PostPage() {
  const { id } = useParams();

  useEffect(() => {
    return () => {
      saveItem('keyword', 'popular');
      saveItem('category', '');
    };
  }, []);

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
          image: null,
        };

  const { handleSubmit, register, control, setValue } = useForm<FieldValues>({
    defaultValues,
  });

  const mutateEditMeeting = useMutation({
    mutationFn: editMeeting,
  });

  const mutatePostMeeting = useMutation({
    mutationFn: postMeeting,
  });

  const mutateDeleteMeeting = useMutation({
    mutationFn: deleteMeeting,
    onSuccess: () => {
      location.assign('/main');
    },
  });

  const onSubmit = (postForm: FieldValues) => {
    id ? mutateEditMeeting.mutate({ id: +id, postForm }) : mutatePostMeeting.mutate(postForm);
  };

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  const disabledHours = () => {
    const hours = range(0, 24);
    const availableHours = hours.filter((hour) => hour < new Date().getHours() + 2);
    return availableHours;
  };

  return (
    <>
      <TopNavBar name={'post'} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrap>
          <FormTitle>모임에 대해 설명해주세요!</FormTitle>
          <FormContents>
            <ModalAccordionButton register={register} control={control} name={'category'} />
            <FormAlert>모임 생성 이후 변경이 불가능하니 신중하게 선택해주세요!</FormAlert>
            <FormLabel>
              <label htmlFor="title">모임 이름</label>
              <span>*</span>
            </FormLabel>
            <FieldWrap>
              <InputField
                {...register('title', { required: true })}
                type="text"
                id="title"
                maxLength={20}
                placeholder={currPost ? currPost.title : '모임 이름을 입력해주세요'}
                onChange={(e) => handleChangeInputField(e)}
              />
              <TextLength>
                <span>{`${title.length}/20`}</span>
              </TextLength>
            </FieldWrap>
            <FormLabel>
              <label htmlFor="image">배경 이미지</label>
            </FormLabel>
            <FileLabel>
              <label htmlFor="image">이미지 올리기</label>
            </FileLabel>
            <InputField {...register('image')} type="file" id="image" accept="image/*" />
            <FormLabel>
              <label htmlFor="content">소개</label>
              <span>*</span>
            </FormLabel>
            <FieldWrap>
              <TextAreaField
                {...register('content', { required: true })}
                id="content"
                maxLength={300}
                placeholder={currPost ? currPost.content : '모두가 즐거운 대화를 나눠요!'}
                onChange={(e) => handleChangeInputField(e)}
              />
              <TextLength>
                <span>{`${content.length}/300`}</span>
              </TextLength>
            </FieldWrap>
            <ModalAccordionButton register={register} control={control} name={'platform'} />
          </FormContents>

          <FormTitle>모임은 어디에서 언제 시작하나요?</FormTitle>
          <FormContents>
            <FormLabel>
              <label htmlFor="link">링크</label>
            </FormLabel>
            <InputField
              {...register('link', { required: false })}
              type="text"
              id="link"
              value={link}
              placeholder={currPost ? currPost.link : '링크를 입력해주세요'}
              onChange={(e) => handleChangeInputField(e)}
            />
            <ModalAccordionButton register={register} control={control} name={'startDate'} />
            <FormLabel>
              <label htmlFor="startTime">모임 시간</label>
              <span>*</span>
            </FormLabel>
            <Controller
              name="startTime"
              control={control}
              render={({ field: { onChange } }) => (
                <TimeInputField>
                  {id ? (
                    <TimePicker
                      {...register('startTime', { required: true })}
                      format="HH:mm"
                      minuteStep={10}
                      showNow={false}
                      placeholder="시간을 선택해주세요"
                      disabledHours={disabledHours}
                      defaultValue={dayjs(defaultValues.startTime, 'HH:mm')}
                      onChange={(value, dateString) => {
                        onChange(calcStartTime(dateString));
                      }}
                    />
                  ) : (
                    <TimePicker
                      {...register('startTime', { required: true })}
                      format="HH:mm"
                      minuteStep={10}
                      showNow={false}
                      placeholder="시간을 선택해주세요"
                      disabledHours={disabledHours}
                      onChange={(value, dateString) => {
                        onChange(calcStartTime(dateString));
                      }}
                    />
                  )}
                </TimeInputField>
              )}
            />
            <ModalAccordionButton register={register} control={control} name={'duration'} />
          </FormContents>

          <FormTitle>모임은 몇 명이 어떻게 들어오나요?</FormTitle>
          <FormContents>
            <ModalAccordionButton register={register} control={control} name={'maxNum'} />
            <FormAlert>모임 생성 이후 변경이 불가능하니 신중하게 선택해주세요!</FormAlert>
            <Toggle
              isSecret={currPost ? currPost.secret : false}
              register={register}
              setValue={setValue}
            />
          </FormContents>
        </FormWrap>

        <ButtonWrap>
          <div>
            <PostButton type="submit">{id ? '수정완료' : '작성완료'}</PostButton>
            {id && (
              <DeleteButton type="button" onClick={() => mutateDeleteMeeting.mutate({ id: +id })}>
                모임 삭제하기
              </DeleteButton>
            )}
          </div>
        </ButtonWrap>
      </form>
    </>
  );
}
