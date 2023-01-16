import { createPortal } from 'react-dom';
import { Control, Controller, FieldValues, UseFormRegister } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import useShowModalAccordion from '../../hooks/useShowModalAccordion';
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
          <label htmlFor={currModal.name}>{currModal.title}</label>
          <Controller
            name={name}
            control={control}
            render={({ field: { value } }) => (
              <input
                type="button"
                onClick={() => handleShowModal(currModal.name)}
                value={value}
                disabled={(id && name === 'category') || (id && name === 'maxNum') ? true : false}
                {...register(name, { required: true })}
              />
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
