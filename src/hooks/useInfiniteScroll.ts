import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addMeetingList } from '../modules/homeSlice';
import { getNextMeetings } from '../services/api';
import { loadItem } from '../services/storage';
import { Meeting } from '../types/AppTypes';

export default function useInfiniteScroll(currMeetingList: Meeting[]) {
  const dispatch = useDispatch();

  const keyword = loadItem('keyword');
  const pageId = useRef<number>(1);

  const { fetchNextPage } = useInfiniteQuery(
    ['nextMeetings'],
    ({
      pageParam = keyword === 'popular'
        ? pageId.current
        : currMeetingList[currMeetingList.length - 1].id,
    }) =>
      getNextMeetings({
        meetingId: pageParam,
        keyword,
      }),
    {
      getNextPageParam: (lastPage) => {
        const lastMeetingList = lastPage.data.meetingList;

        return keyword === 'popular'
          ? pageId.current
          : lastMeetingList.length !== 0 && lastMeetingList[lastMeetingList.length - 1].id;
      },
      onSuccess: (data) => {
        const nextMeetingList = data.pages[data.pages.length - 1].data.meetingList;
        dispatch(addMeetingList(nextMeetingList));
      },
    }
  );

  const onIntersect = useCallback(
    (entry: IntersectionObserverEntry, observer: IntersectionObserver): void => {
      pageId.current = pageId.current + 1;
      fetchNextPage();
    },
    []
  );

  return { onIntersect };
}
