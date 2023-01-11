import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { isMaster } from '../../modules/authSlice';
import { useAppSelector } from '../../store';
import { DetailTypes } from '../../types/DetailTypes';

type meetingId = {
  id: number;
  //useParam로 넘어오는 값이 string이라서 그런가요?
  //number는 안먹넹. 도대체 무슨 type인지...
};
const DetailNavBar = ({ data }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMaster = useAppSelector((state) => state.auth.isMaster);

  const handleClickMeetingEdit = (id: any) => {
    // 모임 수정페이지로 이동
  };
  const handleClickExit = (id: any) => {
    // meetingAttend(id)
    // 모임 나가기 patch - 어떤 데이터를 수정해야 하는건가
  };
  const handleClickAlarm = (id: any) => {
    // 알람 patch -어떤 데이터를 수정해야 하는건가
    // getAlarm(id);
  };

  return (
    <div>
      <div className="detail_nav">
        <button
          onClick={() => {
            navigate('/main');
          }}
        >
          뒤로가기
        </button>
        <span>{data?.title}</span>
        <button
          onClick={() => {
            id && handleClickAlarm(id);
          }}
        >
          알림아이콘
        </button>
        <button>모임공유</button>
        {isMaster ? (
          <button
            onClick={() => {
              handleClickMeetingEdit(id);
            }}
          >
            모임 정보 수정
          </button>
        ) : (
          <button
            onClick={() => {
              handleClickExit(id);
            }}
          >
            모임 나가기
          </button>
        )}
      </div>
    </div>
  );
};

export default DetailNavBar;
