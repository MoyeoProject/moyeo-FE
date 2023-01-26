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
      {currMeetingList.length === 0 ? (
        <span>참여한 모임이 없어요!</span>
      ) : (
        currMeetingList.map((meeting) => (
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
        ))
      )}
      {sortbyKeyword === 'calendar'
        ? null
        : nextMeetingList?.map((meeting) => (
            <MeetingWrap key={meeting.id}>
              <ListContent currMeeting={meeting} />
              <>
                {meeting.attendantsList && meeting.attendantsList.length !== 0 ? (
                  <AttendantsContent attendantsList={meeting.attendantsList} />
                ) : (
                  <div></div>
                )}
              </>
            </MeetingWrap>
          ))}
      <div ref={intersectRef}></div>
    </MeetingListWrap>
  );
}
