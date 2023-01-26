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
  const sortbyKeyword = loadItem('keyword');

  const { onIntersect, nextMeetingList } = useInfiniteScroll(currMeetingList);
  const intersectRef = useIntersect(onIntersect);

  return (
    <MeetingListWrap keyword={loadItem('keyword')}>
      {currMeetingList.map((meeting) => (
        <MeetingWrap key={meeting.id}>
          <ListContent currMeeting={meeting} />
          {sortbyKeyword === 'calendar' ? null : (
            <>
              {meeting.attendantsList && meeting.attendantsList.length !== 0 ? (
                <AttendantsContent attendantsList={meeting.attendantsList} />
              ) : (
                <div></div>
              )}
            </>
          )}
        </MeetingWrap>
      ))}
      {nextMeetingList?.map((meeting) => (
        <MeetingWrap key={meeting.id}>
          <ListContent currMeeting={meeting} />
          {sortbyKeyword === 'calendar' ? null : (
            <div>
              {meeting.attendantsList && meeting.attendantsList.length !== 0 ? (
                <AttendantsContent attendantsList={meeting.attendantsList} />
              ) : (
                <div></div>
              )}
            </div>
          )}
        </MeetingWrap>
      ))}
      <div ref={intersectRef}></div>
    </MeetingListWrap>
  );
}
