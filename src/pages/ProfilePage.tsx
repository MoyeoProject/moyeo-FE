import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';

import Frame_user from '../assets/Frame_user.svg';
import Right_Side from '../assets/Right_Side.svg';
import ProfileModalForm from '../components/ProfileModalForm';
import TopNavBar from '../components/common/TopNavBar';
import { getMyInfo } from '../services/api';
import { saveItem } from '../services/storage';

export default function ProfilePage() {
  useEffect(() => {
    return () => {
      saveItem('keyword', 'popular');
      saveItem('category', '');
      saveItem('year', '');
      saveItem('month', '');
    };
  }, []);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { data } = useQuery({
    queryKey: ['myMeetings'],
    queryFn: getMyInfo,
  });

  const myInfo = data?.data.data;
  const { profileMsg, username, profileUrl } = myInfo;

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
            profileUrl={profileUrl}
            profileMsg={profileMsg}
            username={username}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </>
  );
}
