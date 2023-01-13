import { ModalWrap, Overlay } from '../../styles/ModalFormStyle';

type ModalAccordionProps = {
  name: string;
  title: string;
  options: string[] | null;
  onClickConfirm: (event: React.ChangeEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

export default function ModalAccordion({
  name,
  title,
  options,
  onClickConfirm,
  onClose,
}: ModalAccordionProps) {
  return (
    <Overlay>
      <ModalWrap>
        <button onClick={onClose}>Close</button>
        <p>{title}</p>
        <form name={name} onSubmit={onClickConfirm}>
          {options &&
            options.map((option) => {
              return (
                <label key={option} htmlFor={option}>
                  <input id={option} type="radio" name={name} value={option} />
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
