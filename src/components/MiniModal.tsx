import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

import useCloseModal from '../hooks/useCloseModal';
import { deleteMyProfile, editMyProfile } from '../services/api';
import { saveItem } from '../services/storage';
import { MiniModalWrap, ModalTitle } from '../styles/ModalStyle';

export default function MiniModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef(null);
  useCloseModal(modalRef, onClose);

  const queryClient = useQueryClient();

  const fetchEditMyProfile = useMutation({
    mutationFn: editMyProfile,
    onSuccess: (data) => {
      saveItem('profileUrl', data.data.data.profileUrl);
      queryClient.invalidateQueries({ queryKey: ['myMeetings'] });
      onClose();
    },
  });

  const fetchDeleteMyProfile = useMutation({
    mutationFn: deleteMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myMeetings'] });
      onClose();
    },
  });

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    const formDataForSubmit = new FormData();
    files && formDataForSubmit.append('file', files[0]);

    fetchEditMyProfile.mutate(formDataForSubmit);
  };
  return (
    <MiniModalWrap ref={modalRef}>
      <ModalTitle align={'start'}>프로필 변경</ModalTitle>
      <label htmlFor="file">이미지 불러오기</label>
      <input
        type="file"
        id="file"
        accept="image/*"
        required
        onChange={(e) => handleChangeImage(e)}
      />
      <button type="button" onClick={() => fetchDeleteMyProfile.mutate()}>
        기본 이미지로 변경
      </button>
    </MiniModalWrap>
  );
}
