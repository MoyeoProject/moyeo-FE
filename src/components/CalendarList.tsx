import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import MeetingList from '../components/MeetingList';
import { getMyList } from '../services/api';
import { removeItem, saveItem } from '../services/storage';
import { CalendarListWrap, CalendarWrap } from '../styles/CalendarListStyle';
import { countDownTimer } from '../utils/utils';
import Calendar from './common/Calendar';

export default function CalendarList() {
  const [startDate, setStartDate] = useState<Date>(new Date());

  const timerRef = useRef<HTMLSpanElement>(null);

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

  const willAttendDates = data?.data.data.meetingList
    ?.map((obj: { startDate: string; startTime: string }) => {
      const [hours, mins, secs] = obj.startTime.split(':');
      const time = new Date(obj.startDate).setHours(+hours, +mins, +secs);
      return new Date(time);
    })
    .filter((time: number) => new Date(time) >= new Date());

  const closeDate = new Date(Math.min(...willAttendDates));

  countDownTimer(closeDate, timerRef);

  const meetingList = data?.data.data.meetingList?.filter((obj: { startDate: string }) => {
    return new Date(obj.startDate).getDate() === startDate.getDate() && obj;
  });

  return (
    <CalendarListWrap>
      <span ref={timerRef}>00:00:00:00</span>
      <CalendarWrap>
        <Calendar attendDates={attendDates} startDate={startDate} setStartDate={setStartDate} />
      </CalendarWrap>
      <MeetingList currMeetingList={meetingList} />
    </CalendarListWrap>
  );
}
