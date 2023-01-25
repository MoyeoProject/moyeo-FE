import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getNextMeetings } from '../services/api';
import { loadItem } from '../services/storage';
import { Meeting } from '../types/AppTypes';

export default function useInfiniteScroll(currMeetingList: Meeting[]) {
  const keyword = loadItem('keyword');

  const { fetchNextPage, data } = useInfiniteQuery(
    ['nextMeetings'],
    ({ pageParam = keyword === 'popular' ? 1 : currMeetingList[currMeetingList.length - 1].id }) =>
      getNextMeetings({
        meetingId: pageParam,
        keyword,
      }),
    {
      getNextPageParam: (lastPage, allPage) => {
        const lastMeetingList = lastPage.data.meetingList;

        return keyword === 'new'
          ? lastMeetingList[lastMeetingList.length - 1].id
          : allPage.length + 1;
      },
    }
  );

  const nextMeetingList = data?.pages.map((page) => page.data.meetingList).flat();

  const onIntersect = useCallback(
    (entry: IntersectionObserverEntry, observer: IntersectionObserver): void => {
      fetchNextPage();
    },
    []
  );

  return { onIntersect, nextMeetingList };
}
