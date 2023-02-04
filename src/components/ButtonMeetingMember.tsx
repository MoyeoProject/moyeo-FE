import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { useMeetAttendExit } from '../hooks/useAttendButton';
import { meetEntranceApi } from '../services/api';
import { ButtonBasic } from '../styles/DetailButtonStyle';
import { DetailMeetingModal } from './DetailButtonModal';

const ButtonMeetingMember = ({ data, member }: any) => {
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const ids = Number(id);
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  const todayTime = today.getTime();
  const durationTime = data?.duration * 3600000;

  const startDate = data?.startDate;
  const startTime = data?.startTime;
  const meetingTime = new Date(startDate + 'T' + startTime).getTime();
  console.log(data);

  const useEntranceMetting = () => {
    return useMutation(meetEntranceApi, {
      onSuccess: () => {
        QueryClient.invalidateQueries(['detail', id]);
      },
    });
  };
  const { mutate: entranceMetting } = useEntranceMetting();
  const meetingEntranceBtn = () => {
    if (data?.link) {
      entranceMetting({ id, link: data?.link });
    } else {
      toast('아직 링크가 생성되지 않았습니다');
    }
  };

  const { mutate: meetAttendExit } = useMeetAttendExit();
  const handleClickAttnedExit = (ids: number | undefined) => {
    meetAttendExit(ids);
  };

  const MemberMeetingBefore = () => {
    return (
      <>
        {member?.length === data?.maxNum ? (
          <ButtonBasic activeBtn={false}>정원이 다 찼습니다</ButtonBasic>
        ) : !data?.attend ? (
          <ButtonBasic
            onClick={() => {
              if (data.secret) {
                setShowModal(true);
              } else {
                handleClickAttnedExit(ids);
              }
            }}
            activeBtn={true}
            cursorAct={true}
          >
            참석하기
          </ButtonBasic>
        ) : data?.link ? (
          <ButtonBasic activeBtn={true} cursorAct={true} onClick={meetingEntranceBtn}>
            입장하기
          </ButtonBasic>
        ) : (
          <ButtonBasic activeBtn={false} cursorAct={false}>
            모임이 아직 시작되지 않았습니다
          </ButtonBasic>
        )}
      </>
    );
  };

  const MemberMeetingStart = () => {
    return (
      <>
        {!data?.attend ? (
          <ButtonBasic
            onClick={() => {
              if (data.secret) {
                setShowModal(true);
              } else {
                handleClickAttnedExit(ids);
              }
            }}
            activeBtn={true}
            cursorAct={true}
          >
            참석하기
          </ButtonBasic>
        ) : !data?.link ? (
          <ButtonBasic activeBtn={false} cursorAct={false}>
            모임이 생성되지 않았습니다
          </ButtonBasic>
        ) : (
          <ButtonBasic activeBtn={true} cursorAct={true} onClick={meetingEntranceBtn}>
            입장하기
          </ButtonBasic>
        )}
      </>
    );
  };
  const MemberMeetingAfter = () => {
    return (
      <>
        {!data?.entrance ? (
          <ButtonBasic activeBtn={false} cursorAct={false}>
            이미 완료된 모임입니다
          </ButtonBasic>
        ) : data?.review ? (
          <ButtonBasic activeBtn={false} cursorAct={false}>
            이미 완료된 모임입니다
          </ButtonBasic>
        ) : (
          <ButtonBasic
            activeBtn={true}
            cursorAct={true}
            onClick={() => {
              navigate(`/review/${id}`);
            }}
          >
            후기 남기기
          </ButtonBasic>
        )}
      </>
    );
  };

  return (
    <>
      {todayTime > meetingTime + durationTime
        ? MemberMeetingAfter()
        : todayTime < meetingTime
        ? MemberMeetingBefore()
        : MemberMeetingStart()}
      {showModal &&
        createPortal(
          <DetailMeetingModal
            onClose={() => setShowModal(false)}
            passwordCheck={data?.password}
            id={id}
          />,
          document.body
        )}
    </>
  );
};
export default ButtonMeetingMember;
