import { Link } from 'react-router-dom';

import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useIntersect from '../hooks/useIntersect';
import { loadItem } from '../services/storage';
import { MeetingListWrap, MeetingWrap } from '../styles/MeetingListStyle';
import { Meeting } from '../types/AppTypes';
import AttendantsContent from './AttendantsContent';
import ButtonContent from './ButtonContent';
import ListContent from './ListContent';

type ListItemsProps = {
  currMeetingList: Meeting[];
};

export default function MeetingList({ currMeetingList }: ListItemsProps) {
  const sortbyKeyword = loadItem('keyword');

  const { onIntersect } = useInfiniteScroll(currMeetingList);
  const intersectRef = useIntersect(onIntersect);

  return (
    <MeetingListWrap>
      {currMeetingList.map((meeting) => (
        <MeetingWrap key={meeting.id}>
          <Link to={`/detail/${meeting.id}`}>
            <ListContent currMeeting={meeting} />
          </Link>
          {sortbyKeyword === 'calendar' ? null : (
            <div>
              {meeting.attendantsList && meeting.attendantsList.length !== 0 ? (
                <AttendantsContent attendantsList={meeting.attendantsList} />
              ) : (
                <div></div>
              )}
              <ButtonContent currMeeting={meeting} />
            </div>
          )}
        </MeetingWrap>
      ))}
      <div ref={intersectRef}></div>
    </MeetingListWrap>
  );
}
