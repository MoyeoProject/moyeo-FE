import useInfiniteScroll from '../hooks/useInfiniteScroll';
import useInfiniteScrollByPageId from '../hooks/useInfiniteScrollByPageId';
import { Meeting } from '../types/AppTypes';
import ButtonContent from './ButtonContent';
import ListContent from './ListContent';

type ListItemsProps = {
  currMeetingList: Meeting[];
  sortbyKeyword: string;
};

export default function MeetingList({ currMeetingList, sortbyKeyword }: ListItemsProps) {
  const { listRef } = useInfiniteScroll(currMeetingList, sortbyKeyword);
  const { popularListRef } = useInfiniteScrollByPageId(currMeetingList, sortbyKeyword);

  return (
    <>
      {sortbyKeyword === 'popular' ? (
        <ul ref={popularListRef}>
          {currMeetingList.map((meeting) => (
            <li key={meeting.id}>
              <ListContent currMeeting={meeting} />
              <ButtonContent currMeeting={meeting} />
            </li>
          ))}
        </ul>
      ) : sortbyKeyword === 'new' ? (
        <ul ref={listRef}>
          {currMeetingList.map((meeting) => (
            <li key={meeting.id}>
              <ListContent currMeeting={meeting} />
              <ButtonContent currMeeting={meeting} />
            </li>
          ))}
        </ul>
      ) : (
        <ul ref={listRef}>
          {currMeetingList.map((meeting) => (
            <li key={meeting.id}>
              <ListContent currMeeting={meeting} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
