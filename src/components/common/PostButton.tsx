import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FieldValues, useForm } from 'react-hook-form';

import { patchJoinMeeting } from '../../services/api';
import { PostButtonStyle } from '../../styles/PostButtonStyle';
import { Meeting } from '../../types/AppTypes';
import ModalForm from './ModalForm';

export default function PostButton({ currMeeting }: { currMeeting: Meeting }) {
  const { secret, id, attend, password } = currMeeting;

  const [isAttend, setIsAttend] = useState(attend);
  const [showModal, setShowModal] = useState(false);

  const joinMeeting = useMutation({
    mutationFn: patchJoinMeeting,
    onError: (data: any) => {
      alert(data.response.data.statusMsg);
    },
    onSuccess: (data) => {
      typeof data.data.data === 'object'
        ? alert('참석을 완료했습니다.')
        : alert('모임에서 나왔습니다.');
      setIsAttend((prev) => !prev);
    },
  });

  const handleClickJoin = (inputField: string | null) => {
    if (inputField !== null) {
      if (inputField === password) {
        joinMeeting.mutate(id);
        setShowModal(false);
      } else {
        alert('비밀번호가 틀렸습니다!');
      }
    } else {
      joinMeeting.mutate(id);
      setShowModal(false);
    }
  };

  const { setValue } = useForm<FieldValues>();

  return !isAttend && secret ? (
    <>
      <PostButtonStyle type="button" onClick={() => setShowModal(true)}>
        {!isAttend ? '참여' : '취소'}
      </PostButtonStyle>
      {showModal &&
        createPortal(
          <ModalForm
            setValue={setValue}
            onClickConfirm={handleClickJoin}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </>
  ) : (
    <PostButtonStyle type="button" onClick={() => handleClickJoin(null)}>
      {!isAttend ? '참여' : '취소'}
    </PostButtonStyle>
  );
}
