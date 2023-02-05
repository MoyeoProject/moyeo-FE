import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import profile_camera_icon from '../assets/profile_camera_icon.svg';
import user_img from '../assets/user_img.svg';
import useChangePostForm from '../hooks/useChangePostForm';
import useCloseModal from '../hooks/useCloseModal';
import { editMyInfo } from '../services/api';
import { saveItem } from '../services/storage';
import { ModalButton } from '../styles/ButtonStyle';
import { FormLabel, InputField } from '../styles/FormStyle';
import { ButtonsBox, ModalProfile, ModalTitle, ModalWrap, Overlay } from '../styles/ModalStyle';
import { ProfileButton, ProfileIcon, ProfileImg } from '../styles/ProfileStyle';
import MiniModal from './MiniModal';

type ProfileModalFormProps = {
  profileUrl: string | null;
  profileMsg: string;
  username: string;
  onClose: () => void;
};

export default function ProfileModalForm({
  profileUrl,
  profileMsg,
  username,
  onClose,
}: ProfileModalFormProps) {
  const { postForm, handleChangeInputField } = useChangePostForm();
  const [showModal, setShowModal] = useState(false);

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

  const { handleSubmit, register } = useForm<FieldValues>({
    defaultValues: { username, profileMsg },
  });

  const onSubmit = (postForm: FieldValues) => {
    const { username, profileMsg } = postForm;

    fetchEditMyInfo.mutate({ username, profileMsg });
    onClose();
  };

  return (
    <Overlay>
      <ModalWrap ref={modalRef}>
        <ModalTitle align={'center'}>프로필</ModalTitle>

        <ModalProfile>
          <ProfileButton type="button" onClick={() => setShowModal(true)}>
            <ProfileImg
              isModal={true}
              src={profileUrl === null ? user_img : profileUrl}
              alt={profileUrl === null ? user_img : profileUrl}
            />
            <ProfileIcon src={profile_camera_icon} alt={profile_camera_icon} />
          </ProfileButton>
        </ModalProfile>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel>
            <label htmlFor="username">닉네임 변경</label>
          </FormLabel>
          <InputField
            {...register('username', { required: true })}
            type="text"
            id="username"
            maxLength={10}
            placeholder={username ? username : '닉네임'}
            value={postForm.username}
            onChange={(e) => handleChangeInputField(e)}
          />
          <FormLabel>
            <label htmlFor="profileMsg">소개글</label>
          </FormLabel>
          <InputField
            {...register('profileMsg')}
            type="text"
            id="profileMsg"
            maxLength={60}
            placeholder={profileMsg ? profileMsg : '나를 소개해주세요'}
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

        {showModal && <MiniModal onClose={() => setShowModal(false)} />}
      </ModalWrap>
    </Overlay>
  );
}
