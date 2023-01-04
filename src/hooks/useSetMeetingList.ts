import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getSortbyMeetings } from '../services/api';
import { setMeetingList } from '../slice';

const DEFAULT_KEYWORD = 'popular';

type ReturnType = {
  isLoading: boolean;
  isError: boolean;
};

export default function useSetMeetingList(): ReturnType {
  const dispatch = useDispatch();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['meetings'],
    queryFn: () => getSortbyMeetings(DEFAULT_KEYWORD),
  });

  useEffect(() => {
    dispatch(setMeetingList(data?.data));
  }, []);

  return {
    isError,
    isLoading,
  };
}
