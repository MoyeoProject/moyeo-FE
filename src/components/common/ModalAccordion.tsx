import { useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller, FieldValues } from 'react-hook-form';

import modal_plus_icon from '../../assets/modal_plus_icon.svg';
import useCloseModal from '../../hooks/useCloseModal';
import { PostButton } from '../../styles/ButtonStyle';
import { ModalTitle, ModalWrap, OptionsBox, Overlay } from '../../styles/ModalStyle';
import { calcStartDate } from '../../utils/utils';
import Calendar from '../common/Calendar';

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
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [option, setOption] = useState<string | number | null>(null);

  const modalRef = useRef(null);
  useCloseModal(modalRef, onClose);

  return (
    <Overlay>
      <ModalWrap ref={modalRef}>
        <ModalTitle align={'center'}>{title}</ModalTitle>
        {name === 'startDate' ? (
          <>
            <Controller
              name={name}
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  <Calendar attendDates={[]} startDate={startDate} setStartDate={setStartDate} />
                  <PostButton
                    type="button"
                    onClick={() => {
                      onChange(calcStartDate(startDate));
                      onClose();
                    }}
                    disabled={!startDate ? true : false}
                  >
                    확인
                  </PostButton>
                </>
              )}
            />
          </>
        ) : (
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange } }) => (
              <>
                {options &&
                  options.map((option) => {
                    return (
                      <OptionsBox name={name} key={option}>
                        {name === 'duration' || name === 'maxNum' ? null : (
                          <img src={modal_plus_icon} />
                        )}
                        <button
                          type="button"
                          onClick={(event) => {
                            const { innerHTML } = event.currentTarget;
                            name === 'duration' || name === 'maxNum'
                              ? setOption(+innerHTML)
                              : setOption(innerHTML);
                          }}
                        >
                          {option}
                        </button>
                      </OptionsBox>
                    );
                  })}
                <PostButton
                  type="button"
                  onClick={() => {
                    onChange(option);
                    onClose();
                  }}
                  disabled={!option ? true : false}
                >
                  확인
                </PostButton>
              </>
            )}
          />
        )}
      </ModalWrap>
    </Overlay>
  );
}
