import { createPortal } from 'react-dom';
import { Control, Controller, FieldValues, UseFormRegister } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import bottom_arrow_icon from '../../assets/bottom_arrow_icon.svg';
import useShowModalAccordion from '../../hooks/useShowModalAccordion';
import { ArrowImg, FormLabel, InputField, InputFieldBox } from '../../styles/FormStyle';
import ModalAccordion from './ModalAccordion';

export default function ModalAccordionButton({
  register,
  control,
  name,
}: {
  register: UseFormRegister<FieldValues>;
  control: Control<FieldValues>;
  name: string;
}) {
  const { id } = useParams();

  const { modals, handleShowModal, handleCloseModal } = useShowModalAccordion();
  const currModal = modals.find((modal) => modal.name === name);

  return (
    <>
      {currModal && (
        <>
          <FormLabel htmlFor={currModal.name}>{currModal.title}</FormLabel>
          <Controller
            name={name}
            control={control}
            render={({ field: { value } }) => (
              <InputFieldBox>
                <InputField
                  type="button"
                  value={value}
                  disabled={(id && name === 'category') || (id && name === 'maxNum') ? true : false}
                  onClick={() => handleShowModal(currModal.name)}
                  {...register(name, { required: true })}
                />
                <ArrowImg src={bottom_arrow_icon} />
              </InputFieldBox>
            )}
          />
          {currModal.isOpen &&
            createPortal(
              <ModalAccordion
                name={currModal.name}
                title={currModal.title}
                options={currModal.options}
                onClose={() => handleCloseModal(name)}
                control={control}
              />,
              document.body
            )}
        </>
      )}
    </>
  );
}
