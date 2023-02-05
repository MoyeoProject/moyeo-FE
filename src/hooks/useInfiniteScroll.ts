import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getNextMeetings } from '../services/api';
import { loadItem } from '../services/storage';
import { Meeting } from '../types/AppTypes';

export default function useInfiniteScroll(currMeetingList: Meeting[]) {
  const { fetchNextPage, data } = useInfiniteQuery(
    ['nextMeetings'],
    ({
      pageParam = loadItem('keyword') === 'popular'
        ? 1
        : currMeetingList[currMeetingList.length - 1].id,
    }) =>
      getNextMeetings({
        meetingId: pageParam,
        keyword: loadItem('keyword'),
      }),
    {
      getNextPageParam: (lastPage, allPage) => {
        const lastMeetingList = lastPage.data.meetingList;

        if (lastPage.data.meetingList.length !== 0) {
          return loadItem('keyword') === 'popular'
            ? allPage.length + 1
            : lastMeetingList[lastMeetingList.length - 1].id;
        } else {
          return undefined;
        }
      },
      enabled: false,
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
