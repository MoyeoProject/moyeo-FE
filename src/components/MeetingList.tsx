import meeting_img from '../assets/meeting_img.svg';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useIntersect from '../hooks/useIntersect';
import { loadItem } from '../services/storage';
import { MeetingListWrap, MeetingWrap } from '../styles/MeetingListStyle';
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
      {currMeetingList.map((meeting) => (
        <MeetingWrap key={meeting.id}>
          <img src={!meeting.img ? meeting_img : meeting.img} />
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
          <img src={!meeting.img ? meeting_img : meeting.img} />
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
