import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import CalendarList from '../components/CalendarList';
import MeetingList from '../components/MeetingList';
import TopNavBar from '../components/common/TopNavBar';
import { getSortbyMeetings } from '../services/api';
import { loadItem, removeItem, saveItem } from '../services/storage';

export default function HomePage() {
  useEffect(() => {
    saveItem('keyword', 'popular');
    saveItem('category', '');
    saveItem('year', '');
    saveItem('month', '');
    return () => {
      saveItem('keyword', '');
      saveItem('category', '');
      removeItem('year');
      removeItem('month');
    };
  }, []);

  const { data } = useQuery({
    queryKey: ['meetings'],
    queryFn: () => getSortbyMeetings(loadItem('keyword')),
  });

  return (
    <>
      <TopNavBar name={'home'} />
      {loadItem('keyword') === 'calendar' ? (
        <CalendarList currMeetingList={data?.data.data.meetingList} />
      ) : (
        <MeetingList currMeetingList={data?.data.data.meetingList} />
      )}
    </>
  );
}
