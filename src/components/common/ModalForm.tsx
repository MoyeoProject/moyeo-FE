import { useRef } from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

import useChangeInputField from '../../hooks/useChangeInputField';
import { Contents, ModalWrap, Overlay } from '../../styles/ModalFormStyle';

type ModalFormProps = {
  setValue: UseFormSetValue<FieldValues>;
  onClose: () => void;
  onClickConfirm: any;
};

export default function ModalForm({ setValue, onClose, onClickConfirm }: ModalFormProps) {
  const { inputField, handleChangeInputField } = useChangeInputField();
  const modalRef = useRef(null);

  const handleClickConfirm = () => {
    setValue('password', inputField);
    onClose();
  };

  return (
    <Overlay>
      <ModalWrap ref={modalRef}>
        <label htmlFor="password">비밀번호</label>
        <Contents>
          <input
            id="password"
            type="password"
            value={inputField}
            maxLength={4}
            onChange={(e) => handleChangeInputField(e)}
            placeholder={'최대 4자까지 입력이 가능해요'}
          />
          <button onClick={onClose}>취소</button>
          <button
            onClick={() => (onClickConfirm ? onClickConfirm(inputField) : handleClickConfirm())}
          >
            {onClickConfirm ? '확인' : '등록하기'}
          </button>
        </Contents>
      </ModalWrap>
    </Overlay>
  );
}
