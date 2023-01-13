import { useState } from 'react';
import { createPortal } from 'react-dom';

import { Circle, ToggleButton, ToggleWrapper } from '../styles/ToggleStyle';
import ModalForm from './common/ModalForm';

export default function Toggle({
  onClickConfirmPassword,
  onClickConfirmSecret,
}: {
  onClickConfirmPassword: (password: string, callback: () => void) => void;
  onClickConfirmSecret: any;
}) {
  const [secret, setSecret] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onClickToggle = () => {
    setSecret((prev) => !prev);
    onClickConfirmSecret(!secret);
  };

  return (
    <>
      <ToggleWrapper>
        <ToggleButton onClick={() => onClickToggle()} secret={secret}>
          <Circle secret={secret} />
        </ToggleButton>
      </ToggleWrapper>
      <p>비밀번호</p>
      <button type="button" onClick={() => setShowModal(true)} disabled={secret ? false : true}>
        {secret ? '입력하기>' : '비활성화>'}
      </button>
      {showModal &&
        createPortal(
          <ModalForm
            onClose={() => setShowModal(false)}
            onClickConfirm={onClickConfirmPassword}
            meetingId={1}
            password={secret}
            name={'등록하기'}
          />,
          document.body
        )}
    </>
  );
}
