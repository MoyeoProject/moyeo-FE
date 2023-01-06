import { ModalContentStyle } from '../../styles/ModalContentStyle';

export default function ModalContent({ onClose }: { onClose: () => void }) {
  return (
    <ModalContentStyle>
      <div>I'm a modal dialog</div>
      <button onClick={onClose}>Close</button>
    </ModalContentStyle>
  );
}
