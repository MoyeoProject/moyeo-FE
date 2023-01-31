import React from 'react';

import { InfoNav } from '../pages/FollowPage';
import { InfoBox } from '../styles/InfoBoxStyle';

export const InfoPrivacy = () => {
  return (
    <>
      <InfoBox>
        <InfoNav children={'개인정보'} />
      </InfoBox>
    </>
  );
};
