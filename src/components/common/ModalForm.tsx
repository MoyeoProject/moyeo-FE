import { useRef } from 'react';
import toast from 'react-hot-toast';

import useChangeInputField from '../../hooks/useChangeInputField';
import useCloseModal from '../../hooks/useCloseModal';
import { ModalButton } from '../../styles/ButtonStyle';
import { InputField } from '../../styles/FormStyle';
import { ButtonsBox, ModalTitle, ModalWrap, Overlay } from '../../styles/ModalStyle';

export default function ModalForm({
  onClose,
  onClickConfirm,
}: {
  onClose: () => void;
  onClickConfirm: (inputField: string) => void;
}) {
  const { inputField, handleChangeInputField } = useChangeInputField();

  const modalRef = useRef(null);
  useCloseModal(modalRef, onClose);

  const handleClickConfirm = (inputField: string) => {
    if (inputField === '') {
      toast('비밀번호를 입력해주세요.');
    } else if (inputField.length < 4) {
      toast('비밀번호를 최소 4자 입력해주세요.');
    } else {
      onClickConfirm(inputField);
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
            placeholder={'비밀번호를 입력하세요'}
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
