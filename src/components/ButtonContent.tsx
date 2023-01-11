import { Link } from 'react-router-dom';

import { Meeting } from '../types/AppTypes';
import PostButton from './common/PostButton';

export default function ButtonContent({ currMeeting }: { currMeeting: Meeting }) {
  const { master, attend, secret } = currMeeting;

  return (
    <>
      {master ? (
        <Link to="#">
          <button type="button">수정버튼</button>
        </Link>
      ) : attend ? (
        <PostButton name={'취소'} currMeeting={currMeeting} />
      ) : secret ? (
        <PostButton name={'참여'} currMeeting={currMeeting} />
      ) : (
        <PostButton name={'참여'} currMeeting={currMeeting} />
      )}
    </>
  );
}
