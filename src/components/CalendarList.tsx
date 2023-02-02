import { useRef, useState } from 'react';

import meeting_img from '../assets/meeting_img.svg';
import { loadItem } from '../services/storage';
import { CalendarListWrap, CalendarWrap, ExceptionWrap } from '../styles/CalendarListStyle';
import {
  Detail,
  MeetingImg,
  MeetingListWrap,
  MeetingWrap,
  Time,
  TimerWrap,
  Title,
} from '../styles/MeetingListStyle';
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
      <TimerWrap>
        <Title>
          <p>다음 모임까지 남은 시간</p>
        </Title>
        <Time>
          <span ref={timerRef}>
            {closeDate.getTime() ? '00 : 00 : 00 : 00' : '이번 달은 더 이상 모임이 없습니다.'}
          </span>
        </Time>
        <Detail>
          <span>DAYS</span>
          <span>HOURS</span>
          <span>MIN</span>
          <span>SEC</span>
        </Detail>
      </TimerWrap>
      <CalendarWrap>
        <Calendar attendDates={attendDates} startDate={startDate} setStartDate={setStartDate} />
      </CalendarWrap>
      <MeetingListWrap keyword={loadItem('keyword')}>
        <h2>모임 일정</h2>
        {meetingList.length === 0 ? (
          <ExceptionWrap>
            <p>예정 모임이 없습니다</p>
            <p>모임을 찾으러 가보실래요?</p>
            <button type="button" onClick={() => location.reload()}>
              인기 모임 보러가기
            </button>
          </ExceptionWrap>
        ) : (
          meetingList.map((meeting) => (
            <MeetingWrap key={meeting.id}>
              <MeetingImg
                keyword={loadItem('keyword')}
                src={!meeting.img ? meeting_img : meeting.img}
                alt={!meeting.img ? meeting_img : meeting.img}
              />
              <ListContent currMeeting={meeting} />
            </MeetingWrap>
          ))
        )}
      </MeetingListWrap>
    </CalendarListWrap>
  );
}
