import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as FramePlusIcon } from '../assets/Frame_plus.svg';
import { ReactComponent as Frame_user } from '../assets/Frame_user.svg';
import { FollowButton } from '../components/common/FollowButton';
import { getFollowerList, getFollowingList } from '../services/api';
import { Member, MemberBox } from '../styles/DetailAttendListStyle';
import { FollowListBox, SubPageBox } from '../styles/ProfileSubPageStyle';
import { MemberTypes } from '../types/DetailTypes';
import { ProfileSubNav } from './AlarmListPage';

const FollowPage = () => {
  const navigate = useNavigate();
  const { keyword } = useParams();

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
  console.log(keyword);
  return (
    <SubPageBox>
      <ProfileSubNav children={keyword === 'follow' ? '팔로우' : '팔로워'} />

      <FollowListBox>
        <div className="followTitle">
          {keyword === 'follow' ? '팔로우ddddd' : '팔로워'}
          <span>{followList?.data.data.followList.length}</span>
        </div>
        <div className="followList">
          {followList?.data.data.followList.map((list: MemberTypes) => {
            return (
              <MemberBox key={list.userId}>
                <Member>
                  <div className="imgBox">
                    <Frame_user />
                  </div>
                  <div>
                    <span>{list.username}</span>
                    <FramePlusIcon />
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
