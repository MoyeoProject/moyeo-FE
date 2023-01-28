import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AlarmList } from '../components/AlarmList';
import { InfoDeveloper } from '../components/InfoDeveloper';
import { InfoPrivacy } from '../components/InfoPrivacy';

const InfoEx = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate('/follow/follow');
        }}
      >
        팔로우
      </button>
      <button
        onClick={() => {
          navigate('/follow/follower');
        }}
      >
        팔로워
      </button>
      {/* <InfoDeveloper /> */}
      {/* <InfoPrivacy /> */}
      {/* <AlarmList /> */}
    </>
  );
};

export default InfoEx;
