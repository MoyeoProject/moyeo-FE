import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import right_arrow_icon from '../assets/right_arrow_icon.svg';
import {
  ArrowImg,
  Circle,
  InputField,
  InputFieldBox,
  ToggleButton,
  ToggleContents,
  ToggleLabel,
} from '../styles/ToggleStyle';
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

  const handleClickConfirm = (inputField: string) => {
    setValue('password', inputField);
    setShowModal(false);
  };

  return (
    <>
      <ToggleContents isInput={false}>
        <ToggleLabel htmlFor="secret">공개 설정</ToggleLabel>
        <input {...register('secret')} />
        <ToggleButton type="button" secret={secret} onClick={() => handleClickToggle()}>
          <Circle secret={secret} />
        </ToggleButton>
      </ToggleContents>

      <ToggleContents isInput={true}>
        <ToggleLabel htmlFor="secret">비밀번호</ToggleLabel>
        <InputFieldBox>
          <InputField
            type="button"
            onClick={() => setShowModal(true)}
            value={secret ? '입력' : '없음'}
            disabled={secret ? false : true}
            {...register('password', {
              required: secret ? true : false,
            })}
          />
          <ArrowImg src={right_arrow_icon} />
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
