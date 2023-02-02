import meeting_img from '../assets/meeting_img.svg';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useIntersect from '../hooks/useIntersect';
import { loadItem } from '../services/storage';
import { MeetingImg, MeetingListWrap, MeetingWrap } from '../styles/MeetingListStyle';
import { Meeting } from '../types/AppTypes';
import AttendantsContent from './AttendantsContent';
import ListContent from './ListContent';

type ListItemsProps = {
  currMeetingList: Meeting[];
};

export default function MeetingList({ currMeetingList }: ListItemsProps) {
  const { onIntersect, nextMeetingList } = useInfiniteScroll(currMeetingList);
  const intersectRef = useIntersect(onIntersect);

  return (
    <MeetingListWrap keyword={loadItem('keyword')}>
      <h2>{loadItem('keyword') === 'popular' ? '인기 모임' : '신규 모임'}</h2>
      {currMeetingList.map((meeting) => (
        <MeetingWrap key={meeting.id}>
          <MeetingImg
            keyword={loadItem('keyword')}
            src={!meeting.img ? meeting_img : meeting.img}
            alt={!meeting.img ? meeting_img : meeting.img}
          />
          <div>
            <ListContent currMeeting={meeting} />
            {meeting.attendantsList && meeting.attendantsList.length !== 0 ? (
              <AttendantsContent attendantsList={meeting.attendantsList} />
            ) : (
              <div></div>
            )}
          </div>
        </MeetingWrap>
      ))}
      {nextMeetingList?.map((meeting) => (
        <MeetingWrap key={meeting.id}>
          <MeetingImg
            keyword={loadItem('keyword')}
            src={!meeting.img ? meeting_img : meeting.img}
            alt={!meeting.img ? meeting_img : meeting.img}
          />
          <div>
            <ListContent currMeeting={meeting} />
            {meeting.attendantsList && meeting.attendantsList.length !== 0 ? (
              <AttendantsContent attendantsList={meeting.attendantsList} />
            ) : (
              <div></div>
            )}
          </div>
        </MeetingWrap>
      ))}
      <div ref={intersectRef}></div>
    </MeetingListWrap>
  );
}
