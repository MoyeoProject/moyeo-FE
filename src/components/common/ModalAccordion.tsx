import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Control, Controller, FieldValues } from 'react-hook-form';

import modal_plus_icon from '../../assets/modal_plus_icon.svg';
import { PostButton } from '../../styles/ButtonStyle';
import { CategorySelectorBox, ModalTitle, ModalWrap, Overlay } from '../../styles/ModalStyle';
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
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [option, setOption] = useState<string | null>(null);

  return (
    <Overlay>
      <ModalWrap>
        <ModalTitle align={'center'}>{title}</ModalTitle>
        {name === 'startDate' ? (
          <>
            <Controller
              name={name}
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => {
                      setStartDate(date);
                    }}
                    minDate={new Date()}
                    inline
                  />
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
                      <CategorySelectorBox key={option}>
                        <img src={modal_plus_icon} />
                        <button
                          type="button"
                          onClick={(event) => {
                            const { innerHTML } = event.currentTarget;
                            setOption(innerHTML);
                          }}
                        >
                          {option}
                        </button>
                      </CategorySelectorBox>
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
