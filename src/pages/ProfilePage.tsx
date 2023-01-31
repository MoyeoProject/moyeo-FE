import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

import Frame_user from '../assets/Frame_user.svg';
import black_right_arrow_Icon from '../assets/black_right_arrow_Icon.svg';
import ProfileModalForm from '../components/ProfileModalForm';
import TopNavBar from '../components/common/TopNavBar';
import { getMyInfo } from '../services/api';

export default function ProfilePage() {
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
        <span>팔로우</span>
        <div>{myInfo.followingsNum}</div>
        <span>팔로워</span>
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
        <button type="button" onClick={() => handleClickLogout()}>
          로그아웃
        </button>
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
