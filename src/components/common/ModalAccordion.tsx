import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { ModalFormWrap, Overlay } from '../../styles/ModalFormStyle';
import { calcStartDate } from '../../utils/utils';

type ModalAccordionProps = {
  name: string;
  title: string;
  options: string[] | null;
  onClose: () => void;
  control: Control<FieldValues>;
};

export default function ModalAccordion({
  name,
  title,
  options,
  onClose,
  control,
}: ModalAccordionProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <Overlay>
      <ModalFormWrap>
        <p>{title}</p>
        {name === 'startDate' ? (
          <>
            <Controller
              name={name}
              control={control}
              render={({ field: { onChange } }) => (
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    if (date) {
                      setStartDate(date);
                      onChange(calcStartDate(date));
                    }
                  }}
                  minDate={new Date()}
                  inline
                />
              )}
            />
            <button type="button" onClick={onClose} disabled={false}>
              확인
            </button>
          </>
        ) : (
          <>
            {options &&
              options.map((option) => {
                return (
                  <Controller
                    key={option}
                    name={name}
                    control={control}
                    render={({ field: { onChange } }) => (
                      <label key={option} htmlFor={option}>
                        <input
                          type="radio"
                          id={option}
                          name={name}
                          onChange={(event) => {
                            const { id } = event.target;
                            name === 'maxNum' || name === 'duration' ? onChange(+id) : onChange(id);
                          }}
                        />
                        {option}
                      </label>
                    )}
                  />
                );
              })}
            <button type="button" onClick={onClose} disabled={false}>
              확인
            </button>
          </>
        )}
      </ModalFormWrap>
    </Overlay>
  );
}
