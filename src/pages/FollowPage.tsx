import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as Frame_user } from '../assets/Frame_user.svg';
import { FollowButton } from '../components/common/FollowButton';
import { getFollowerList, getFollowingList } from '../services/api';
import { loadItem } from '../services/storage';
import { Member, MemberBox } from '../styles/DetailAttendListStyle';
import { FollowListBox, SubPageBox } from '../styles/ProfileSubPageStyle';
import { MemberTypes } from '../types/DetailTypes';
import { SubNav } from './AlarmListPage';

const FollowPage = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const username = loadItem('username');

  const { data: followList } = useQuery(
    ['follow'],
    () => {
      if (keyword === 'follow') {
        return getFollowingList();
      } else {
        return getFollowerList();
      }
    },
    {
      keepPreviousData: true,
    }
  );

  return (
    <SubPageBox>
      <SubNav children={username} />
      <FollowListBox>
        <div className="followTitle">
          {keyword === 'follow' ? '팔로잉' : '팔로워'}
          <span>{followList?.data.data.followList.length}</span>
        </div>
        <div className="followList">
          {followList?.data.data.followList.map((list: MemberTypes) => {
            return (
              <MemberBox key={list.userId}>
                <Member>
                  <div className="imgBox">
                    {list.profileUrl ? <img src={list.profileUrl} /> : <Frame_user />}
                  </div>
                  <div>
                    <span>{list.username}</span>
                  </div>
                </Member>
                {keyword === 'follow' ? (
                  <FollowButton userId={list.userId} followed={true} />
                ) : null}
              </MemberBox>
            );
          })}
        </div>
      </FollowListBox>
    </SubPageBox>
  );
};
export default FollowPage;
