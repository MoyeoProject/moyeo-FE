import { Link } from 'react-router-dom';

import { Meeting } from '../../types/AppTypes';
import PostButton from './PostButton';

type ListItemsProps = {
  currMeetingList: Meeting[];
  sortbyKeyword: string;
};

export default function ListItems({ currMeetingList, sortbyKeyword }: ListItemsProps) {
  return (
    <ul>
      {currMeetingList.map((meeting) => (
        // <Link key={meeting.id} to="#">
        <li key={meeting.id}>
          <p>{meeting.id}</p>
          <p>{meeting.title}</p>
          {/* {meeting.content} 최대 1줄까지만 표시*/}
          <p>{meeting.startDate}</p>
          <p>{meeting.startTime}</p>
          <p>{meeting.duration}</p>
          <p>{meeting.platform}</p>
          {meeting.secret ? <span>자물쇠 아이콘</span> : null}
          {sortbyKeyword !== 'calendar' &&
            /* {meeting.attendantsList => attendant.userProfileImg} 3명까지만 프로필사진 보이고 나머지 인원수 표시*/
            (meeting.master ? (
              <Link to="#">
                <button type="button">수정버튼</button>
              </Link>
            ) : meeting.attend ? (
              <PostButton name={'취소'} isSecret={null} meetingId={meeting.id} />
            ) : meeting.secret ? (
              <PostButton name={'참여'} isSecret={true} meetingId={meeting.id} />
            ) : (
              <PostButton name={'참여'} isSecret={false} meetingId={meeting.id} />
            ))}
        </li>
        // </Link>
      ))}
    </ul>
  );
}
