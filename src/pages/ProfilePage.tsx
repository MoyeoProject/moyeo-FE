import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import black_right_arrow_icon from '../assets/black_right_arrow_icon.svg';
import profile_pencil_icon from '../assets/profile_pencil_icon.svg';
import user_img from '../assets/user_img.svg';
import ProfileModalForm from '../components/ProfileModalForm';
import TopNavBar from '../components/common/TopNavBar';
import { getMyInfo } from '../services/api';
import { loadItem, saveItem } from '../services/storage';
import {
  BottomSettings,
  ProfileButton,
  ProfileDetail,
  ProfileIcon,
  ProfileImg,
  ProfileWrap,
  TopButtons,
  UserInformation,
} from '../styles/ProfileStyle';
import { Badge } from '../styles/TopNavBarStyle';

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

  return (
    <>
      <TopNavBar name={'profile'} />
      <ProfileWrap>
        <TopButtons>
          <ProfileButton type="button" onClick={() => setShowModal(true)}>
            <ProfileImg
              isModal={false}
              src={profileUrl === null ? user_img : profileUrl}
              alt={profileUrl === null ? user_img : profileUrl}
            />
            <ProfileIcon src={profile_pencil_icon} alt={profile_pencil_icon} />
          </ProfileButton>
          <ProfileDetail>
            <div>
              <h4>참여 모임</h4>
              <span>{myInfo.attendantsNum}</span>
            </div>
            <div>
              <h4
                onClick={() => {
                  navigate('/follow/follow');
                }}
              >
                팔로잉
              </h4>
              <span>{myInfo.followingsNum}</span>
            </div>
            <div>
              <h4
                onClick={() => {
                  navigate('/follow/follower');
                }}
              >
                팔로워
              </h4>
              <span>{myInfo.followersNum}</span>
            </div>
          </ProfileDetail>
        </TopButtons>
        <UserInformation>
          <span>{myInfo.username}</span>
          <p>{myInfo.profileMsg}</p>
        </UserInformation>
        <BottomSettings>
          <span>설정</span>
          <Link to="/alarm">
            <span>
              알림
              {loadItem('existenceAlarm') === 'true' && <Badge></Badge>}
            </span>
            <img src={black_right_arrow_icon} alt={black_right_arrow_icon} />
          </Link>
          <Link
            to="#"
            onClick={() => {
              toast('준비중인 페이지입니다');
            }}
          >
            <span>공지</span>
            <img src={black_right_arrow_icon} alt={black_right_arrow_icon} />
          </Link>
          <Link to="/account">
            <span>계정</span>
            <img src={black_right_arrow_icon} alt={black_right_arrow_icon} />
          </Link>
          <Link to="/developer">
            <span>만든이들</span>
            <img src={black_right_arrow_icon} alt={black_right_arrow_icon} />
          </Link>
        </BottomSettings>
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
      </ProfileWrap>
    </>
  );
}
