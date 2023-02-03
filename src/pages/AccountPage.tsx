import React from 'react';

import right_arrow_icon from '../assets/right_arrow_icon.svg';
import { AccountBox, SubPageBox } from '../styles/ProfileSubPageStyle';
import { SubNav } from './AlarmListPage';

const AccountPage = () => {
  return (
    <SubPageBox>
      <SubNav children={'계정'} />
      <AccountBox>
        <p>계정</p>
        <div>
          <span>계정 관리</span>
          <img src={right_arrow_icon} alt={right_arrow_icon} />
        </div>
        <div>
          <span>로그아웃</span>
          <img src={right_arrow_icon} alt={right_arrow_icon} />
        </div>
      </AccountBox>
    </SubPageBox>
  );
};
export default AccountPage;
