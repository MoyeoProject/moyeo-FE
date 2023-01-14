import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { ModalWrap, Overlay } from '../../styles/ModalFormStyle';
import { calcStartDate } from '../../utils/utils';

type ModalAccordionProps = {
  name: string;
  title: string;
  options: string[] | null;
  onClickConfirm: (event: React.ChangeEvent<HTMLFormElement>) => void;
  onClickTimeConfirm: (startDate: string) => void;
  onClose: () => void;
};

export default function ModalAccordion({
  name,
  title,
  options,
  onClickConfirm,
  onClickTimeConfirm,
  onClose,
}: ModalAccordionProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <Overlay>
      <ModalWrap>
        <button onClick={onClose}>Close</button>
        <p>{title}</p>
        {name === 'startDate' ? (
          <>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              inline
            />
            <button
              type="submit"
              onClick={() => startDate && onClickTimeConfirm(calcStartDate(startDate))}
              disabled={false}
            >
              확인
            </button>
          </>
        ) : (
          <form name={name} onSubmit={onClickConfirm}>
            {options &&
              options.map((option) => {
                return (
                  <label key={option} htmlFor={option}>
                    <input
                      id={option}
                      type="radio"
                      name={name}
                      value={
                        name === 'maxNum'
                          ? `${option}명`
                          : name === 'duration'
                          ? `${option}시간`
                          : option
                      }
                    />
                    {option}
                  </label>
                );
              })}
            <button type="submit" disabled={false}>
              확인
            </button>
          </form>
        )}
      </ModalWrap>
    </Overlay>
  );
}
