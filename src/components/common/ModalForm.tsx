import useChangeInputField from '../../hooks/useChangeInputField';
import { Contents, ModalWrap, Overlay } from '../../styles/ModalFormStyle';

type ModalFormProps = {
  onClose: () => void;
  onClickConfirm: any;
  meetingId: number;
  password: string | boolean;
  name: string;
};

export default function ModalForm({
  onClose,
  onClickConfirm,
  meetingId,
  password,
  name,
}: ModalFormProps) {
  const { inputField, handleChangeInputField, handleClearInputField } = useChangeInputField();

  const handleConfirmPassword = (keyword: string) => {
    if (name === '참여') {
      keyword === password ? onClickConfirm(meetingId, null) : alert('비밀번호가 틀렸습니다!');
      handleClearInputField();
    }
    keyword ? onClickConfirm(keyword, () => onClose()) : alert('비밀번호를 입력해주세요!');
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
            value={inputField ? inputField : ''}
            placeholder={
              name === '등록하기' ? '최대 4자까지 입력이 가능해요' : '비밀번호를 입력해주세요'
            }
            minLength={4}
            onChange={(e) => handleChangeInputField(e)}
          />
          <button onClick={onClose}>취소</button>
          <button onClick={() => handleConfirmPassword(inputField)}>{name}</button>
        </Contents>
      </ModalWrap>
    </Overlay>
  );
}
