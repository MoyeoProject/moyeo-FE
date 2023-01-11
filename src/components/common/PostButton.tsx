import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import { patchJoinMeeting } from '../../services/api';
import ModalContent from './ModalContent';

type PostButtonProps = {
  name: string;
  isSecret: boolean | null;
  meetingId: number;
};

export default function PostButton({ name, isSecret, meetingId }: PostButtonProps) {
  const [showModal, setShowModal] = useState(false);

  const joinMeeting = useMutation({
    mutationFn: patchJoinMeeting,
  });

  const handleClickJoin = (meetingId: number) => {
    joinMeeting.mutate(meetingId);
  };

  return isSecret ? (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        {name}
      </button>
      {showModal &&
        createPortal(
          <ModalContent
            onClose={() => setShowModal(false)}
            onClickJoin={() => handleClickJoin(meetingId)}
          />,
          document.body
        )}
    </>
  ) : (
    <button type="button" onClick={() => handleClickJoin(meetingId)}>
      {name}
    </button>
  );
}
