import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { Circle, ToggleButton } from '../styles/ToggleStyle';
import ModalForm from './common/ModalForm';

export default function Toggle({
  register,
  setValue,
}: {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}) {
  const [secret, setSecret] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClickToggle = () => {
    setSecret((prev) => !prev);
    setValue('secret', !secret);
    setValue('password', '');
  };

  return (
    <>
      <input {...register('secret')} disabled />
      <ToggleButton type="button" secret={secret} onClick={() => handleClickToggle()}>
        <Circle secret={secret} />
      </ToggleButton>

      <p>비밀번호</p>
      <input
        type="button"
        onClick={() => setShowModal(true)}
        value={secret ? '입력하기>' : '비활성화>'}
        disabled={secret ? false : true}
        {...register('password', {
          required: secret ? true : false,
        })}
      />
      {showModal &&
        createPortal(
          <ModalForm
            name={'등록하기'}
            setValue={setValue}
            password={null}
            meetingId={null}
            onClickConfirm={null}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </>
  );
}
