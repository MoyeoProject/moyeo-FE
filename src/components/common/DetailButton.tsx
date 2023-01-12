import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { meetAttendExitApi } from '../../services/api';
import { useAppSelector } from '../../store';

const DetailButton = ({ data }: any) => {
  const { id } = useParams();
  const QueryClient = useQueryClient();

  const handleClickAttnedExit = () => {
    console.log('참석/취소버튼 api같음');
  };
  const meetingLink = () => {
    // 모임 입장 링크 입력
  };
  const meetingEntrance = () => {
    // 멤버 모임입장
  };

  const useMeetAttendExit = () => {
    return useMutation(meetAttendExitApi, {
      onSuccess: () => {
        QueryClient.invalidateQueries();
      },
      onError: (err: any) => {
        return alert(err.response.data.statusMsg);
      },
    });
  };

  const { mutate: meetAttendExit } = useMeetAttendExit();
  const handleClickAttned = (id: any) => {
    meetAttendExit(id);
    // ClickAttnedExit(id);
    // DetailNavBar랑 겹침 공통으로 쓸 수 있게 hook으로 빼보기
  };

  return (
    <div>
      {data?.master ? (
        <button onClick={meetingLink}>입장 링크를 입력해주세요</button>
      ) : data?.attend ? (
        <button onClick={meetingEntrance}>모임 입장</button>
      ) : (
        <button
          onClick={() => {
            handleClickAttned(id);
          }}
        >
          모임에 참석한 후 입장 가능합니다
        </button>
      )}
    </div>
  );
};

export default DetailButton;
