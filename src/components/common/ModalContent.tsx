import { Contents, ModalWrap, Overlay } from '../../styles/ModalContentStyle';

type ModalContentProps = {
  onClose: () => void;
  onClickJoin: () => void;
};

export default function ModalContent({ onClose, onClickJoin }: ModalContentProps) {
  return (
    <Overlay>
      <ModalWrap>
        <button onClick={onClose}>Close</button>
        <Contents>
          <input type="password" placeholder="비밀번호를 입력해주세요" minLength={4}></input>
          <button onClick={onClickJoin}>참여</button>
        </Contents>
      </ModalWrap>
    </Overlay>
  );
}
