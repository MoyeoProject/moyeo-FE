import { useState } from 'react';

type Modal = {
  name: string;
  title: string;
  content: string | null;
  isOpen: boolean;
  options: string[] | null;
};

const modalData: Modal[] = [
  {
    name: 'category',
    title: '모임주제',
    content: '주제를 선택해주세요',
    isOpen: false,
    options: ['공부하자', '게임하자', '밥먹자', '수다떨자', '술먹자'],
  },
  {
    name: 'platform',
    title: '이용 플랫폼',
    content: '플랫폼을 선택해주세요',
    isOpen: false,
    options: ['GATHER TOWN', 'DISCORD', 'ZOOM', 'GOOGLE MEET', 'ZEP', 'OTT', '기타'],
  },
  {
    name: 'startDate',
    title: '모임 날짜',
    content: '날짜를 선택해주세요',
    isOpen: false,
    options: null,
  },
  {
    name: 'duration',
    title: '예상 소요시간',
    content: '예상 소요시간을 선택해주세요',
    isOpen: false,
    options: ['1h', '2h', '3h', '기타'],
  },
  {
    name: 'maxNum',
    title: '최대 인원',
    content: null,
    isOpen: false,
    options: ['5', '10', '20', '30'],
  },
];

export default function useShowModalAccordion() {
  const [modals, setModals] = useState(modalData);

  const handleShowModal = (name: string) => {
    setModals(
      modals.map((modal) =>
        modal.name === name
          ? {
              ...modal,
              isOpen: true,
            }
          : modal
      )
    );
  };

  const handleCloseModal = (name: string) => {
    setModals(
      modals.map((modal) =>
        modal.name === name
          ? {
              ...modal,
              isOpen: false,
            }
          : modal
      )
    );
  };

  return {
    modals,
    handleShowModal,
    handleCloseModal,
  };
}
