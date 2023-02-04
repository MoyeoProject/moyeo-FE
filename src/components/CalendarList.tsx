import { useRef, useState } from 'react';
import { useEffect } from 'react';

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
  refetch: () => void;
};

export default function CalendarList({ currMeetingList, refetch }: ListItemsProps) {
  const [startDate, setStartDate] = useState<Date>(new Date());

  const timerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    countDownTimer(currMeetingList, timerRef);
  }, []);

  const attendDates = currMeetingList?.map((obj: { startDate: string }) => {
    return new Date(new Date(obj.startDate).setHours(0, 0, 0, 0)).getTime();
  });

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
          {currMeetingList.length === 0 ? (
            <span>이번 달은 더 이상 모임이 없습니다.</span>
          ) : (
            <span ref={timerRef}>00 : 00 : 00 : 00</span>
          )}
        </Time>
        <Detail>
          <span>DAYS</span>
          <span>HOURS</span>
          <span>MIN</span>
          <span>SEC</span>
        </Detail>
      </TimerWrap>
      <CalendarWrap>
        <Calendar refetch={refetch} attendDates={attendDates} setStartDate={setStartDate} />
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
                src={!meeting.image ? meeting_img : meeting.image}
                alt={!meeting.image ? meeting_img : meeting.image}
              />
              <ListContent currMeeting={meeting} />
            </MeetingWrap>
          ))
        )}
      </MeetingListWrap>
    </CalendarListWrap>
  );
}
