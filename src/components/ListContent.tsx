import { Meeting } from '../types/AppTypes';

export default function ListContent({ currMeeting }: { currMeeting: Meeting }) {
  const { title, content, startTime, duration, platform, secret, attendantsList } = currMeeting;

  return (
    <>
      <p>title: {title}</p>
      {/*content 한 줄만 표시*/}
      <p>content: {content} </p>
      <p>날짜: {startTime}</p>
      <p>시간: {startTime}</p>
      <p>duration: {duration}시간~</p>
      <p>platform: {platform}</p>
      {secret ? <span>자물쇠 아이콘</span> : null}
      {/*참석자 3명 이상이면 3명까지만 프로필 보여주고 나머지는 숫자로 표시*/}
      <div className="user-profile">
        {attendantsList &&
          attendantsList.map((attendant) => (
            <img
              key={attendant.userId}
              src={
                attendant.userProfileImg
                  ? attendant.userProfileImg
                  : 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927'
              }
            />
          ))}
      </div>
    </>
  );
}
