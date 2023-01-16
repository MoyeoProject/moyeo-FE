import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';

import { patchJoinMeeting } from '../../services/api';
import { Meeting } from '../../types/AppTypes';
import ModalForm from './ModalForm';

export default function PostButton({ name, currMeeting }: { name: string; currMeeting: Meeting }) {
  const { secret, id, password } = currMeeting;

  const [showModal, setShowModal] = useState(false);

  const joinMeeting = useMutation({
    mutationFn: patchJoinMeeting,
  });

  const handleClickJoin = (meetingId: number) => {
    joinMeeting.mutate(meetingId);
  };

  const { setValue } = useForm();

  return secret ? (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        {name}
      </button>
      {showModal &&
        createPortal(
          <ModalForm
            name={name}
            setValue={setValue}
            password={password}
            meetingId={id}
            onClickConfirm={handleClickJoin}
            onClose={() => setShowModal(false)}
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
