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
    joinMeeting.mutate(id);
    setShowModal(false);
  };

  return !isAttend && secret ? (
    <>
      <HomeButton
        type="button"
        onClick={() => setShowModal(true)}
        disabled={maxNum !== attendantsNum ? false : true}
      >
        {maxNum === attendantsNum ? '마감' : !isAttend ? '참여' : '취소'}
      </HomeButton>
      {showModal &&
        createPortal(
          <ModalForm
            password={password}
            onClickConfirm={handleClickJoin}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </>
  ) : (
    <HomeButton type="button" onClick={() => handleClickJoin(null)}>
      {!isAttend ? '참여' : '취소'}
    </HomeButton>
  );
}
