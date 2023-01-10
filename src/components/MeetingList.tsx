import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useIntersect from '../hooks/useIntersect';
import { loadItem } from '../services/storage';
import { Meeting } from '../types/AppTypes';
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
    <>
      <ul>
        {currMeetingList.map((meeting) => (
          <li key={meeting.id}>
            <ListContent currMeeting={meeting} />
            {sortbyKeyword === 'calendar' ? null : <ButtonContent currMeeting={meeting} />}
          </li>
        ))}
        <div ref={intersectRef}></div>
      </ul>
    </>
  );
}
