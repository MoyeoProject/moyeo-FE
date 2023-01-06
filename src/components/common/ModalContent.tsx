import { Contents, ModalWrap, Overlay } from '../../styles/ModalContentStyle';

export default function ModalContent({ onClose }: { onClose: () => void }) {
  return (
    <Overlay>
      <ModalWrap>
        <button onClick={onClose}>Close</button>
        <Contents>
          <input type="password" placeholder="비밀번호를 입력해주세요" minLength={4}></input>
        </Contents>
      </ModalWrap>
    </Overlay>
  );
}
