import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as FramePlusIcon } from '../assets/Frame_plus.svg';
import { ReactComponent as Frame_user } from '../assets/Frame_user.svg';
import { ReactComponent as Cal_right_arrow_icon } from '../assets/cal_left_arrow_icon.svg';
import { FollowButton } from '../components/common/FollowButton';
import { getFollowerList, getFollowingList } from '../services/api';
import { Member, MemberBox } from '../styles/DetailAttendListStyle';
import { FollowListBox, InfoBox, InfoNavBox } from '../styles/InfoBoxStyle';
import { MemberTypes } from '../types/DetailTypes';

type ChildrenProps = {
  children: React.ReactNode;
};

export const InfoNav = ({ children }: ChildrenProps) => {
  return (
    <InfoNavBox>
      <Link to="#">
        <Cal_right_arrow_icon />
      </Link>
      <span>{children}</span>
    </InfoNavBox>
  );
};

const FollowPage = () => {
  const { keyword } = useParams();

  const { data: followList } = useQuery(['follow'], () => {
    if (keyword === 'follow') {
      return getFollowingList();
    } else {
      return getFollowerList();
    }
  });

  return (
    <InfoBox>
      <InfoNav children={keyword === 'follow' ? '팔로우' : '팔로워'} />

      <FollowListBox>
        <div className="followTitle">
          {keyword === 'follow' ? '팔로우' : '팔로워'}
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
    </InfoBox>
  );
};
export default FollowPage;
