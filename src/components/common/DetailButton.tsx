import React from 'react';

import { useAppSelector } from '../../store';

const DetailButton = () => {
  const isMaster = useAppSelector((state) => state.auth.isMaster);

  const meetingLink = () => {
    // 모임 입장 링크 입력
  };
  const meetingEntrance = () => {
    // 멤버 모임입장
  };
  return (
    <>
      {isMaster ? (
        <button onClick={meetingLink}>입장 링크를 입력해주세요</button>
      ) : (
        <button onClick={meetingEntrance}>모임 입장 / 모임이 시작되지 않았습니다</button>
      )}
    </>
  );
};

export default DetailButton;
