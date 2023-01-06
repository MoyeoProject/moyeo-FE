import { useState } from 'react';
import { createPortal } from 'react-dom';

import ModalContent from './ModalContent';

export default function PostButton({ name, isSecret }: { name: string; isSecret: boolean | null }) {
  const [showModal, setShowModal] = useState(false);

  const handleClickJoin = () => {
    console.log('참석하기');
  };

  return isSecret ? (
    <>
      <button type="button" onClick={() => setShowModal(true)}>
        {name}
      </button>
      {showModal &&
        createPortal(<ModalContent onClose={() => setShowModal(false)} />, document.body)}
    </>
  ) : (
    <button type="button" onClick={() => handleClickJoin()}>
      {name}
    </button>
  );
}
