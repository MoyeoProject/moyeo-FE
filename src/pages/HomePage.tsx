import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Calendar from '../components/Calendar';
import MeetingList from '../components/MeetingList';
import SearchForm from '../components/SearchForm';
import TopNavBar from '../components/common/TopNavBar';
import { setMeetingList } from '../modules/homeSlice';
import { getSortbyMeetings } from '../services/api';
import { loadItem } from '../services/storage';
import { HomeState } from '../types/AppTypes';

export default function HomePage() {
  const dispatch = useDispatch();

  const sortbyKeyword = loadItem('keyword');
  const { meetingList } = useSelector((state: HomeState) => state.home);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['meetings'],
    queryFn: () => getSortbyMeetings(sortbyKeyword),
  });

  useEffect(() => {
    dispatch(setMeetingList(data));
  }, [data?.data.data.meetingList]);

  return (
    <>
      {isLoading && <div>로딩중 입니다...</div>}
      {isError && <div>에러가 발생...</div>}
      <TopNavBar name={'home'} />
      <SearchForm />
      {sortbyKeyword === 'calendar' && <Calendar />}
      {meetingList && meetingList.length !== 0 && <MeetingList currMeetingList={meetingList} />}
    </>
  );
}
