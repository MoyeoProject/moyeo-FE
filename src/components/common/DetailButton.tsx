import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { meetAttendExitApi } from '../../services/api';
import { useAppSelector } from '../../store';

const DetailButton = ({ data }: any) => {
  const { id } = useParams();
  const QueryClient = useQueryClient();

  const meetingLink = () => {
    // 모임 입장 링크 입력
  };
  const meetingEntrance = () => {
    // 멤버 모임입장, 링크로 이동
    alert(`${data.platform}으로 입장합니다`);
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
