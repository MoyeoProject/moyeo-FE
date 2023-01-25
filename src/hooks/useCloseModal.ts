import React, { useEffect } from 'react';

function useCloseModal(ref: React.RefObject<HTMLDivElement>, callback: () => void) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
}

export default useCloseModal;
