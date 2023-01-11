import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { patchJoinMeeting } from '../../services/api';
import { Meeting } from '../../types/AppTypes';
import ModalForm from './ModalForm';

type PostButtonProps = {
  name: string;
  currMeeting: Meeting;
};

export default function PostButton({ name, currMeeting }: PostButtonProps) {
  const { secret, id, password } = currMeeting;

  const [showModal, setShowModal] = useState(false);

  const joinMeeting = useMutation({
    mutationFn: patchJoinMeeting,
  });

  const handleClickJoin = (meetingId: number) => {
    joinMeeting.mutate(meetingId);
  };

  return secret ? (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        {name}
      </button>
      {showModal &&
        createPortal(
          <ModalForm
            onClose={() => setShowModal(false)}
            onClickJoin={handleClickJoin}
            meetingId={id}
            password={password}
            name={name}
          />,
          document.body
        )}
    </>
  ) : (
    <button type="button" onClick={() => handleClickJoin(id)}>
      {name}
    </button>
  );
}
