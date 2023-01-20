import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { patchJoinMeeting } from '../../services/api';
import { HomeButton } from '../../styles/ButtonStyle';
import { Meeting } from '../../types/AppTypes';
import ModalForm from './ModalForm';

export default function PostButton({ currMeeting }: { currMeeting: Meeting }) {
  const { secret, id, attend, password, maxNum, attendantsNum } = currMeeting;

  const [isAttend, setIsAttend] = useState(attend);
  const [showModal, setShowModal] = useState(false);

  const joinMeeting = useMutation({
    mutationFn: patchJoinMeeting,
    onError: (data: any) => {
      alert(data.response.data.statusMsg);
    },
    onSuccess: (data) => {
      if (typeof data.data.data === 'object') {
        alert('참석을 완료했습니다.');
      } else {
        alert('모임에서 나왔습니다.');
      }
      setIsAttend((prev) => !prev);
    },
  });

  const handleClickJoin = (inputField: string | null) => {
    if (inputField !== null) {
      if (inputField === password) {
        joinMeeting.mutate(id);
        setShowModal(false);
      } else if (inputField === '') {
        alert('비밀번호를 입력해주세요.');
      } else {
        alert('비밀번호를 다시 입력해주세요.');
      }
    } else {
      joinMeeting.mutate(id);
      setShowModal(false);
    }
  };

  const handleClickModal = (isOpen: boolean) => {
    if (maxNum !== attendantsNum) {
      setShowModal(isOpen);
    } else {
      alert('정원이 초과되었습니다.');
    }
  };

  return !isAttend && secret ? (
    <>
      <HomeButton type="button" onClick={() => handleClickModal(true)}>
        {!isAttend ? '참여' : '취소'}
      </HomeButton>
      {showModal &&
        createPortal(
          <ModalForm onClickConfirm={handleClickJoin} onClose={() => handleClickModal(false)} />,
          document.body
        )}
    </>
  ) : (
    <HomeButton type="button" onClick={() => handleClickJoin(null)}>
      {!isAttend ? '참여' : '취소'}
    </HomeButton>
  );
}
