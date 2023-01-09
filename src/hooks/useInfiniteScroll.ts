import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addMeetingList } from '../modules/homeSlice';
import { getNextMeetings } from '../services/api';
import { Meeting } from '../types/AppTypes';

export default function useInfiniteScroll(currMeetingList: Meeting[]) {
  const dispatch = useDispatch();

  const listRef = useRef<HTMLUListElement>(null);

  const pageSize = useRef<number>(currMeetingList.length);

  const queryClient = useQueryClient();

  const nextMeetings = useMutation({
    mutationFn: getNextMeetings,
    onSuccess: (data) => {
      const meetingList = data?.data;
      dispatch(addMeetingList({ meetingList }));

      queryClient.invalidateQueries({ queryKey: ['meetings'] });
    },
  });

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lastMeetingId = currMeetingList[pageSize.current - 1].id;
          nextMeetings.mutate(lastMeetingId);

          // observer.unobserve(entry.target);
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

    const nodesListArr = listRef.current?.querySelectorAll('li');
    const lastNode = nodesListArr[nodesListArr.length - 1];

    observer.observe(lastNode);
  }, []);

  return { listRef };
}
