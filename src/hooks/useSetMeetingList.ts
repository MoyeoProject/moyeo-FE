import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setMeetingList } from '../modules/homeSlice';
import { getSortbyMeetings } from '../services/api';
import { loadItem } from '../services/storage';

type ReturnType = {
  isLoading: boolean;
  isError: boolean;
};

export default function useSetMeetingList(): ReturnType {
  const dispatch = useDispatch();

  const sortbyKeyword = loadItem('keyword');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['meetings'],
    queryFn: () => getSortbyMeetings(sortbyKeyword),
  });

  useEffect(() => {
    data && dispatch(setMeetingList(data));
  }, [data?.data.meetingList]);

  return {
    isError,
    isLoading,
  };
}
