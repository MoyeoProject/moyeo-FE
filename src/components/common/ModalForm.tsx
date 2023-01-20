import useChangeInputField from '../../hooks/useChangeInputField';
import { ModalButton } from '../../styles/ButtonStyle';
import { InputField } from '../../styles/FormStyle';
import { ButtonsBox, ModalTitle, ModalWrap, Overlay } from '../../styles/ModalStyle';

type ModalFormProps = {
  onClose: () => void;
  onClickConfirm: (inputField: string) => void;
};

export default function ModalForm({ onClose, onClickConfirm }: ModalFormProps) {
  const { inputField, handleChangeInputField } = useChangeInputField();

  return (
    <Overlay>
      <ModalWrap>
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
            <ModalButton isColor={true} onClick={() => onClickConfirm(inputField)}>
              확인
            </ModalButton>
          </ButtonsBox>
        </>
      </ModalWrap>
    </Overlay>
  );
}
