import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getSortbyMeetings } from '../services/api';

import { Meeting } from '../types/Meeting';

const DEFAULT_KEYWORD = 'popular';
const meetingListData = [
  {
    id: 1,
    masterId: 1,
    isMaster: false,
    title: '',
    category: '',
    startDate: '',
    startTime: '',
    duration: '',
    platform: '',
    maxNum: 10,
    secret: true,
    'secret-password': '',
    attend: true,
    attendantsNum: 5,
    attendantsList: [
      {
        userId: 1,
        userProfileImg: '',
      },
    ],
  },
];

type ReturnType = {
  isLoading: boolean;
  isError: boolean;
  meetingList: Meeting[];
  handleClickSortby: (keyword: string) => void;
};

export default function useSetMeetings(): ReturnType {
  // Q 아래 에러남
  // react.development.js:209 Warning: Invalid hook call
  // const dispatch = useDispatch();
  const [meetingList, setMeetingList] = useState(meetingListData);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['meetings'],
    queryFn: () => getSortbyMeetings(DEFAULT_KEYWORD),
  });

  useEffect(() => {
    setMeetingList(data?.data);
  }, []);

  // Q 혹시 useQuery 함수안에서도 쓰는 방법이 있는지?
  const handleClickSortby = async (keyword: string) => {
    const data = await getSortbyMeetings(keyword);
    // ToDo isLoading, isError처리하기
    setMeetingList(data?.data);
  };

  return {
    isLoading,
    isError,
    meetingList,
    handleClickSortby,
  };
}
