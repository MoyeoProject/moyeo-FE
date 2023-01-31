import { useRef, useState } from 'react';

import { loadItem } from '../services/storage';
import { CalendarListWrap, CalendarWrap } from '../styles/CalendarListStyle';
import { MeetingListWrap, MeetingWrap } from '../styles/MeetingListStyle';
import { Meeting } from '../types/AppTypes';
import { countDownTimer } from '../utils/utils';
import ListContent from './ListContent';
import Calendar from './common/Calendar';

type ListItemsProps = {
  currMeetingList: Meeting[];
};

export default function CalendarList({ currMeetingList }: ListItemsProps) {
  const [startDate, setStartDate] = useState<Date>(new Date());

  const timerRef = useRef<HTMLSpanElement>(null);

  const attendDates = currMeetingList?.map((obj: { startDate: string }) => {
    return new Date(new Date(obj.startDate).setHours(0, 0, 0, 0)).getTime();
  });

  const willAttendDates = currMeetingList
    ?.map((obj: { startDate: string; startTime: string }) => {
      const [hours, mins, secs] = obj.startTime.split(':');
      const time = new Date(obj.startDate).setHours(+hours, +mins, +secs);
      return new Date(time).getTime();
    })
    .filter((time: number) => new Date(time) >= new Date());

  const closeDate = new Date(Math.min(...willAttendDates));

  closeDate.getTime() && countDownTimer(closeDate, timerRef);

  const meetingList = currMeetingList?.filter((obj: { startDate: string }) => {
    return new Date(obj.startDate).getDate() === startDate.getDate() && obj;
  });

  return (
    <CalendarListWrap>
      <span ref={timerRef}>
        {closeDate.getTime() ? '00:00:00:00' : '이번 달은 더 이상 모임이 없습니다.'}
      </span>
      <CalendarWrap>
        <Calendar attendDates={attendDates} startDate={startDate} setStartDate={setStartDate} />
      </CalendarWrap>
      <MeetingListWrap keyword={loadItem('keyword')}>
        {meetingList.length === 0 ? (
          <span>참여한 모임이 없어요!</span>
        ) : (
          meetingList.map((meeting) => (
            <MeetingWrap key={meeting.id}>
              <ListContent currMeeting={meeting} />
            </MeetingWrap>
          ))
        )}
      </MeetingListWrap>
    </CalendarListWrap>
  );
}
