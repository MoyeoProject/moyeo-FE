import React from 'react';

import { ProfileSubNav } from '../pages/AlarmListPage';
import { SubPageBox } from '../styles/ProfileSubPageStyle';

export const InfoPrivacy = () => {
  return (
    <>
      <ProfileSubNav>
        <SubPageBox children={'개인정보'} />
      </ProfileSubNav>
    </>
  );
};
