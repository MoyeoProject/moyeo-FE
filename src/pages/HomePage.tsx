import { useQuery } from '@tanstack/react-query';

import CalendarList from '../components/CalendarList';
import MeetingList from '../components/MeetingList';
import TopNavBar from '../components/common/TopNavBar';
import { getSortbyMeetings } from '../services/api';
import { loadItem } from '../services/storage';

export default function HomePage() {
  const sortbyKeyword = loadItem('keyword');

  const { data } = useQuery({
    queryKey: ['meetings'],
    queryFn: () => getSortbyMeetings(loadItem('keyword')),
  });

  return (
    <>
      <TopNavBar name={'home'} />
      {sortbyKeyword === 'calendar' && <CalendarList />}
      {data?.data.data.meetingList && data?.data.data.meetingList.length !== 0 && (
        <MeetingList currMeetingList={data?.data.data.meetingList} />
      )}
    </>
  );
}
