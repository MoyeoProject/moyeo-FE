import { useCallback, useEffect, useRef } from 'react';

export default function useIntersect(
  onIntersect: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void
) {
  const listRef = useRef<HTMLDivElement>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          onIntersect(entry, observer);
        }
      });
    },
    []
  );

  useEffect(() => {
    if (!listRef.current) {
      return;
    }

    const observer = new IntersectionObserver(callback);
    observer.observe(listRef.current);
    return () => observer.disconnect();
  }, []);

  return listRef;
}
