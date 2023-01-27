import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import Frame_user from '../assets/Frame_user.svg';
import black_right_arrow_Icon from '../assets/black_right_arrow_Icon.svg';
import TopNavBar from '../components/common/TopNavBar';
import { getMyInfo } from '../services/api';

export default function ProfilePage() {
  const { data } = useQuery({
    queryKey: ['myMeetings'],
    queryFn: getMyInfo,
  });

  const myInfo = data?.data.data;

  return (
    <>
      <TopNavBar name={'profile'} />
      <img
        src={myInfo.profileUrl === null ? Frame_user : myInfo.profileUrl}
        alt={myInfo.profileUrl === null ? Frame_user : myInfo.profileUrl}
      />
      <span>{myInfo.username}</span>
      <p>{myInfo.profileMsg}</p>
      <div>
        <div>{myInfo.attendantsNum}</div>
        <div>{myInfo.followingsNum}</div>
        <div>{myInfo.followersNum}</div>
      </div>
      <div>
        <Link to="#">
          <span>알림</span>
          <img src={black_right_arrow_Icon} alt={black_right_arrow_Icon} />
        </Link>
        <Link to="#">
          <span>안내</span>
          <img src={black_right_arrow_Icon} alt={black_right_arrow_Icon} />
        </Link>
        <Link to="#">
          <span>계정</span>
          <img src={black_right_arrow_Icon} alt={black_right_arrow_Icon} />
        </Link>
        <Link to="#">
          <span>만든이들</span>
          <img src={black_right_arrow_Icon} alt={black_right_arrow_Icon} />
        </Link>
      </div>
    </>
  );
}
