import { Link } from 'react-router-dom';

import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import useInfiniteScrollByPageId from '../../hooks/useInfiniteScrollByPageId';
import { Meeting } from '../../types/AppTypes';

type ListItemsProps = {
  currMeetingList: Meeting[];
  sortbyKeyword: string;
};

export default function ListItems({ currMeetingList, sortbyKeyword }: ListItemsProps) {
  const { listRef } = useInfiniteScroll(currMeetingList);
  const { popularListRef } = useInfiniteScrollByPageId(currMeetingList);

  return (
    <>
      {sortbyKeyword === 'popular' ? (
        // ToDo secret=true, attend=false면 참석하기 눌렀을때 password입력하게 해야함
        <ul ref={popularListRef}>
          {currMeetingList.map((meeting) => (
            <Link key={meeting.id} to="#">
              <li>
                <p>{meeting.id}</p>
                <p>{meeting.title}</p>
                {/* {meeting.content} 최대 1줄까지만 표시*/}
                <p>{meeting.startDate}</p>
                <p>{meeting.startTime}</p>
                <p>{meeting.duration}</p>
                <p>{meeting.platform}</p>
                {meeting.secret ? <span>자물쇠 아이콘</span> : null}
                {/* {meeting.attendantsList => attendant.userProfileImg} 3명까지만 프로필사진 보이고 나머지 인원수 표시*/}
                {meeting.master ? (
                  <span>수정 버튼</span>
                ) : meeting.attend ? (
                  <span>취소버튼</span>
                ) : meeting.secret ? (
                  <span>비밀번호 입력 참석버튼</span>
                ) : (
                  <span>참석버튼</span>
                )}
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        // ToDo secret=true, attend=false면 참석하기 눌렀을때 password입력하게 해야함
        <ul ref={listRef}>
          {currMeetingList.map((meeting) => (
            <Link key={meeting.id} to="#">
              <li>
                <p>{meeting.id}</p>
                <p>{meeting.title}</p>
                {/* {meeting.content} 최대 1줄까지만 표시*/}
                <p>{meeting.startDate}</p>
                <p>{meeting.startTime}</p>
                <p>{meeting.duration}</p>
                <p>{meeting.platform}</p>
                {meeting.secret ? <span>자물쇠 아이콘</span> : null}
                {/* {meeting.attendantsList => attendant.userProfileImg} 3명까지만 프로필사진 보이고 나머지 인원수 표시*/}
                {meeting.master ? (
                  <span>수정 버튼</span>
                ) : meeting.attend ? (
                  <span>취소버튼</span>
                ) : meeting.secret ? (
                  <span>비밀번호 입력 참석버튼</span>
                ) : (
                  <span>참석버튼</span>
                )}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
}
