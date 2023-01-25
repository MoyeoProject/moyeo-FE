import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';

import { getNextMeetings } from '../services/api';
import { loadItem } from '../services/storage';
import { Meeting } from '../types/AppTypes';

export default function useInfiniteScroll(currMeetingList: Meeting[]) {
  const keyword = loadItem('keyword');
  const pageId = useRef<number>(1);

  const { fetchNextPage, data } = useInfiniteQuery(
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
    }
  );

  const nextMeetingList = data?.pages.map((page) => page.data.meetingList).flat();

  const onIntersect = useCallback(
    (entry: IntersectionObserverEntry, observer: IntersectionObserver): void => {
      pageId.current = pageId.current + 1;
      fetchNextPage();
    },
    []
  );

  return { onIntersect, nextMeetingList };
}
