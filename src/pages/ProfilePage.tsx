import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';

import Frame_user from '../assets/Frame_user.svg';
import Right_Side from '../assets/Right_Side.svg';
import black_right_arrow_Icon from '../assets/black_right_arrow_Icon.svg';
import ProfileModalForm from '../components/ProfileModalForm';
import TopNavBar from '../components/common/TopNavBar';
import { getMyInfo } from '../services/api';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { data } = useQuery({
    queryKey: ['myMeetings'],
    queryFn: getMyInfo,
  });

  const myInfo = data?.data.data;
  const { profileMsg, username } = myInfo;

  const handleClickLogout = () => {
    location.assign('/');
    localStorage.clear();
  };

  return (
    <>
      <TopNavBar name={'profile'} />
      <button type="button" onClick={() => setShowModal(true)}>
        <img
          src={myInfo.profileUrl === null ? Frame_user : myInfo.profileUrl}
          alt={myInfo.profileUrl === null ? Frame_user : myInfo.profileUrl}
        />
      </button>
      <span>{myInfo.username}</span>
      <p>{myInfo.profileMsg}</p>
      <div>
        <span>참여 모임 수</span>
        <div>{myInfo.attendantsNum}</div>
        {/* 생각해보니 페이지로 나뉜게 아니네요 이제... 프로필에서 컨트롤 해야될거 같아서
        저는 더 안건드릴게유.ㅠㅠ 선영님 마무리 부탁!!  */}
        <span
          onClick={() => {
            navigate('/follow/follow');
          }}
        >
          팔로우
        </span>
        <div>{myInfo.followingsNum}</div>
        <span
          onClick={() => {
            navigate('/follow/follower');
          }}
        >
          팔로워
        </span>
        <div>{myInfo.followersNum}</div>
      </div>

      <div>
        <Link to="/alarm">
          <span>알림</span>
          <img src={Right_Side} alt={Right_Side} />
        </Link>
        <Link to="/setting">
          <span>설정</span>
          <img src={Right_Side} alt={Right_Side} />
        </Link>
      </div>
      {showModal &&
        createPortal(
          <ProfileModalForm
            profileMsg={profileMsg}
            username={username}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </>
  );
}
