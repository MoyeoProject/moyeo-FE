import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addMeetingList } from '../modules/homeSlice';
import { getNextMeetings } from '../services/api';
import { Meeting } from '../types/AppTypes';

export default function useInfiniteScrollByPageId(currMeetingList: Meeting[]) {
  const dispatch = useDispatch();

  const popularListRef = useRef<HTMLUListElement>(null);

  const pageId = useRef<number>(0);

  const nextMeetings = useMutation({
    mutationFn: getNextMeetings,
    onSuccess: (data) => {
      const meetingList = data?.data;
      dispatch(addMeetingList({ meetingList }));
    },
  });

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          pageId.current = pageId.current + 1;
          nextMeetings.mutate(pageId.current);

          observer.unobserve(entry.target);
        }
      });
    },
    []
  );

  useEffect(() => {
    if (!popularListRef.current) {
      return;
    }

    const observer = new IntersectionObserver(callback);

    const nodesListArr = popularListRef.current?.querySelectorAll('li');
    const lastNode = nodesListArr[nodesListArr.length - 1];

    observer.observe(lastNode);
  }, []);

  return { popularListRef };
}
