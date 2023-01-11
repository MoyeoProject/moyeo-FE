import useChangeInputField from '../../hooks/useChangeInputField';
import { Contents, ModalWrap, Overlay } from '../../styles/ModalFormStyle';

type ModalFormProps = {
  onClose: () => void;
  onClickJoin: (meetingId: number) => void;
  meetingId: number;
  password: string;
  name: string;
};

export default function ModalForm({
  onClose,
  onClickJoin,
  meetingId,
  password,
  name,
}: ModalFormProps) {
  const { inputField, handleChangeinputField, handleClearInputField } = useChangeInputField();

  const handleConfirmPassword = (keyword: string) => {
    keyword === password ? onClickJoin(meetingId) : alert('비밀번호가 틀렸습니다!');
    handleClearInputField();
  };

  return (
    <Overlay>
      <ModalWrap>
        <button onClick={onClose}>Close</button>
        <Contents>
          <input
            type="password"
            value={inputField ? inputField : ''}
            placeholder="비밀번호를 입력해주세요"
            minLength={4}
            onChange={(e) => handleChangeinputField(e)}
          />
          <button onClick={() => handleConfirmPassword(inputField)}>{name}</button>
        </Contents>
      </ModalWrap>
    </Overlay>
  );
}
