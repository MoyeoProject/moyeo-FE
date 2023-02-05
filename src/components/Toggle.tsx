import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import right_arrow_icon from '../assets/right_arrow_icon.svg';
import {
  Circle,
  InputField,
  InputFieldBox,
  ToggleButton,
  ToggleContents,
  ToggleLabel,
} from '../styles/ToggleStyle';
import ModalForm from './common/ModalForm';

export default function Toggle({
  isSecret,
  register,
  setValue,
}: {
  isSecret: boolean;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}) {
  const [secret, setSecret] = useState(isSecret);
  const [showModal, setShowModal] = useState(false);

  const handleClickToggle = () => {
    !secret && setShowModal(true);
    setSecret((prev) => !prev);
    setValue('secret', !secret);
    setValue('password', '');
  };

  const handleClickConfirm = (inputField: string) => {
    setValue('password', inputField);
    setShowModal(false);
  };

  return (
    <>
      <ToggleContents isInput={false}>
        <ToggleLabel htmlFor="secret">비공개 설정</ToggleLabel>
        <input {...register('secret')} />
        <ToggleButton type="button" secret={secret} onClick={() => handleClickToggle()}>
          <Circle secret={secret} />
        </ToggleButton>
      </ToggleContents>

      <ToggleContents isInput={true}>
        <ToggleLabel htmlFor="secret">비밀번호</ToggleLabel>
        <InputFieldBox>
          <span>{!secret && '없음'}</span>
          <InputField
            type="button"
            onClick={() => setShowModal(true)}
            disabled={secret ? false : true}
            {...register('password', {
              required: secret ? true : false,
            })}
          />
          <img src={right_arrow_icon} alt={right_arrow_icon} />
        </InputFieldBox>

        {showModal &&
          createPortal(
            <ModalForm onClickConfirm={handleClickConfirm} onClose={() => setShowModal(false)} />,
            document.body
          )}
      </ToggleContents>
    </>
  );
}
