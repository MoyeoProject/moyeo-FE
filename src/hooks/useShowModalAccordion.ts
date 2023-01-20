import { useState } from 'react';

import { Modal } from '../types/AppTypes';

const modalData: Modal[] = [
  {
    name: 'category',
    title: '모임주제',
    content: '주제를 선택해주세요',
    isOpen: false,
    options: [
      '수다모여',
      '술모여',
      '밥모여',
      '영화모여',
      '취미모여',
      '공부모여',
      '게임모여',
      '일단모여',
    ],
  },
  {
    name: 'platform',
    title: '이용 플랫폼',
    content: '플랫폼을 선택해주세요',
    isOpen: false,
    options: ['GATHER_TOWN', 'DISCORD', 'ZOOM', 'GOOGLE_MEET', 'ZEP', 'OTT', 'ETC'],
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
    options: ['1', '2', '3'],
  },
  {
    name: 'maxNum',
    title: '최대 인원',
    content: '선택',
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
