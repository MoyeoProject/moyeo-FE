import { useRef } from 'react';
import toast from 'react-hot-toast';

import useChangeInputField from '../../hooks/useChangeInputField';
import useCloseModal from '../../hooks/useCloseModal';
import { ModalButton } from '../../styles/ButtonStyle';
import { InputField } from '../../styles/FormStyle';
import { ButtonsBox, ModalTitle, ModalWrap, Overlay } from '../../styles/ModalStyle';

type ModalFormProps = {
  password: string | null;
  onClose: () => void;
  onClickConfirm: (inputField: string) => void;
};

export default function ModalForm({ password, onClose, onClickConfirm }: ModalFormProps) {
  const { inputField, handleChangeInputField, handleClearInputField } = useChangeInputField();

  const modalRef = useRef(null);
  useCloseModal(modalRef, onClose);

  const handleClickConfirm = (inputField: string) => {
    if (password === null) {
      onClickConfirm(inputField);
    } else {
      if (inputField === '') {
        toast('비밀번호를 입력해주세요.');
      } else {
        if (inputField === password) {
          onClickConfirm(inputField);
        } else {
          toast('비밀번호를 다시 입력해주세요.');
          handleClearInputField();
        }
      }
    }
  };

  return (
    <Overlay>
      <ModalWrap ref={modalRef}>
        <ModalTitle align={'start'}>비밀번호</ModalTitle>
        <>
          <InputField
            id="password"
            type="password"
            value={inputField}
            maxLength={4}
            onChange={(e) => handleChangeInputField(e)}
            placeholder={'최대 4자까지 입력이 가능해요'}
          />
          <ButtonsBox>
            <ModalButton isColor={false} onClick={onClose}>
              취소
            </ModalButton>
            <ModalButton isColor={true} onClick={() => handleClickConfirm(inputField)}>
              확인
            </ModalButton>
          </ButtonsBox>
        </>
      </ModalWrap>
    </Overlay>
  );
}
