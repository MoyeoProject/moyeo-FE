import { FieldValues, UseFormSetValue } from 'react-hook-form';

import useChangeInputField from '../../hooks/useChangeInputField';
import { Contents, ModalWrap, Overlay } from '../../styles/ModalFormStyle';

type ModalFormProps = {
  name: string;
  password: string | null;
  meetingId: number | null;
  onClose: () => void;
  onClickConfirm: any;
  setValue: UseFormSetValue<FieldValues>;
};

export default function ModalForm({
  name,
  password,
  meetingId,
  onClose,
  onClickConfirm,
  setValue,
}: ModalFormProps) {
  const { inputField, handleChangeInputField } = useChangeInputField();

  const handleClickConfirm = () => {
    setValue('password', inputField);
    onClose();
  };

  return (
    <Overlay>
      <ModalWrap>
        <label htmlFor="password">비밀번호</label>
        <Contents>
          <input
            id="password"
            type="password"
            maxLength={4}
            value={inputField}
            onChange={(e) => handleChangeInputField(e)}
            placeholder={
              name === '등록하기' ? '최대 4자까지 입력이 가능해요' : '비밀번호를 입력해주세요'
            }
          />
          <button onClick={onClose}>취소</button>
          <button onClick={() => handleClickConfirm()}>{name}</button>
        </Contents>
      </ModalWrap>
    </Overlay>
  );
}
