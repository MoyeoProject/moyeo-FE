import { ModalWrap, Overlay } from '../../styles/ModalFormStyle';

type ModalAccordionProps = {
  onClickConfirm: (event: React.ChangeEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

const options = ['공부하자', '게임하자', '밥먹자', '수다떨자', '술먹자'];

export default function ModalAccordion({ onClickConfirm, onClose }: ModalAccordionProps) {
  return (
    <Overlay>
      <ModalWrap>
        <button onClick={onClose}>Close</button>
        <p>모임 주제</p>
        <form onSubmit={onClickConfirm}>
          {options.map((option) => {
            return (
              <label key={option} htmlFor={option}>
                <input id={option} type="radio" name="category" value={option} />
                {option}
              </label>
            );
          })}
          <button type="submit" disabled={false}>
            확인
          </button>
        </form>
      </ModalWrap>
    </Overlay>
  );
}
