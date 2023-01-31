import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import useChangePostForm from '../hooks/useChangePostForm';
import useCloseModal from '../hooks/useCloseModal';
import { deleteMyProfile, editMyInfo, editMyProfile } from '../services/api';
import { saveItem } from '../services/storage';
import { ModalButton } from '../styles/ButtonStyle';
import { InputField } from '../styles/FormStyle';
import { ButtonsBox, ModalTitle, ModalWrap, Overlay } from '../styles/ModalStyle';

type ProfileModalFormProps = {
  profileMsg: string;
  username: string;
  onClose: () => void;
};

export default function ProfileModalForm({ profileMsg, username, onClose }: ProfileModalFormProps) {
  const { postForm, handleChangeInputField } = useChangePostForm();

  const modalRef = useRef(null);
  useCloseModal(modalRef, onClose);

  const fetchEditMyInfo = useMutation({
    mutationFn: editMyInfo,
    onSuccess: (data) => {
      saveItem('isLogin', data?.headers.authorization as unknown as string);
      saveItem('username', data.data.data.username);
      location.reload();
    },
  });

  const fetchEditMyProfile = useMutation({
    mutationFn: editMyProfile,
    onSuccess: (data) => {
      saveItem('profileUrl', data.data.data.profileUrl);
    },
  });

  const fetchDeleteMyProfile = useMutation({
    mutationFn: deleteMyProfile,
    onSuccess: () => {
      location.reload();
    },
  });

  const { handleSubmit, register } = useForm<FieldValues>({
    defaultValues: { username, profileMsg },
  });

  const onSubmit = (postForm: FieldValues) => {
    const { username, profileMsg } = postForm;

    fetchEditMyInfo.mutate({ username, profileMsg });
    onClose();
  };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    const formDataForSubmit = new FormData();
    files && formDataForSubmit.append('file', files[0]);

    fetchEditMyProfile.mutate(formDataForSubmit);
  };

  return (
    <Overlay>
      <ModalWrap ref={modalRef}>
        <ModalTitle align={'center'}>프로필</ModalTitle>
        <label htmlFor="file">사진</label>
        <InputField
          {...register('file', { required: true })}
          type="file"
          id="file"
          accept="image/*"
          required
          onChange={(e) => handleChangeImage(e)}
        />
        <button type="button" onClick={() => fetchDeleteMyProfile.mutate()}>
          삭제
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">닉네임 변경</label>
          <InputField
            {...register('username', { required: true })}
            type="text"
            id="username"
            maxLength={10}
            placeholder={username ? username : '닉네임'}
            value={postForm.username}
            onChange={(e) => handleChangeInputField(e)}
          />
          <label htmlFor="profileMsg">나를 소개해주세요</label>
          <InputField
            {...register('profileMsg')}
            type="text"
            id="profileMsg"
            maxLength={60}
            placeholder={profileMsg ? profileMsg : '최대 20자까지 입력이 가능해요'}
            value={postForm.profileMsg}
            onChange={(e) => handleChangeInputField(e)}
          />
          <ButtonsBox>
            <ModalButton isColor={false} onClick={onClose}>
              취소
            </ModalButton>
            <ModalButton type="submit" isColor={true} disabled={!postForm.username}>
              확인
            </ModalButton>
          </ButtonsBox>
        </form>
      </ModalWrap>
    </Overlay>
  );
}
