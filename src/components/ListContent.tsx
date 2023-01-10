import { Meeting } from '../types/AppTypes';

export default function ListContent({ currMeeting }: { currMeeting: Meeting }) {
  const { title, startDate, startTime, duration, platform, secret } = currMeeting;

  return (
    <>
      <p>{title}</p>
      {/* {content} 최대 1줄까지만 표시*/}
      <p>{startDate}</p>
      <p>{startTime}</p>
      <p>{duration}</p>
      <p>{platform}</p>
      {secret ? <span>자물쇠 아이콘</span> : null}
    </>
  );
}
