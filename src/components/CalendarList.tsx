import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import MeetingList from '../components/MeetingList';
import { getMyList } from '../services/api';
import { removeItem, saveItem } from '../services/storage';
import { CalendarListWrap, CalendarWrap } from '../styles/CalendarListStyle';
import Calendar from './common/Calendar';

export default function CalendarList() {
  const [startDate, setStartDate] = useState<Date>(new Date());

  useEffect(() => {
    return () => {
      removeItem('year');
      removeItem('month');
    };
  }, [saveItem('year', ''), saveItem('month', '')]);

  const { data } = useQuery({
    queryKey: ['myMeetings'],
    queryFn: getMyList,
  });

  const attendDates = data?.data.data.meetingList?.map((obj: { startDate: string }) => {
    return new Date(new Date(obj.startDate).setHours(0, 0, 0, 0)).getTime();
  });

  return (
    <CalendarListWrap>
      <CalendarWrap>
        <Calendar attendDates={attendDates} startDate={startDate} setStartDate={setStartDate} />
      </CalendarWrap>
      <MeetingList currMeetingList={data?.data.data.meetingList} />
    </CalendarListWrap>
  );
}
