import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { getEditingMeeting, meetEntranceApi } from '../services/api';
import { ButtonBasic, MasterButton } from '../styles/DetailButtonStyle';
import { DetailMeetLinkButton } from './DetailButtonModal';

const ButtonMeetingMaster = ({ data }: any) => {
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const ids = Number(id);

  const [showLinkModal, setShowLinkModal] = useState(false);

  const today = new Date();
  const todayTime = today.getTime();
  const durationTime = data?.duration * 3600000;

  const startDate = data?.startDate;
  const startTime = data?.startTime;
  const meetingTime = new Date(startDate + 'T' + startTime).getTime();

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

  const MasterMeetingBefore = () => {
    return (
      <>
        {!data?.link ? (
          <ButtonBasic activeBtn={false} cursorAct={true} onClick={() => setShowLinkModal(true)}>
            입장 링크 입력
          </ButtonBasic>
        ) : (
          <MasterButton>
            <ButtonBasic activeBtn={true} cursorAct={true} onClick={meetingEntranceBtn}>
              입장 하기
            </ButtonBasic>
            <ButtonBasic
              activeBtn={false}
              cursorAct={true}
              onClick={() => {
                navigate(`/post/${id}`);
                getEditingMeeting(ids);
              }}
            >
              입장 링크 수정
            </ButtonBasic>
          </MasterButton>
        )}
      </>
    );
  };

  const MasterMeetingStart = () => {
    return (
      <>
        {!data?.link ? (
          <ButtonBasic activeBtn={true} cursorAct={true} onClick={() => setShowLinkModal(true)}>
            입장링크를 입력해주세요!!
          </ButtonBasic>
        ) : (
          <MasterButton>
            <ButtonBasic activeBtn={true} cursorAct={true} onClick={meetingEntranceBtn}>
              입장 하기
            </ButtonBasic>
            <ButtonBasic activeBtn={false} cursorAct={false}>
              입장링크 수정불가
            </ButtonBasic>
          </MasterButton>
        )}
        {showLinkModal &&
          createPortal(
            <DetailMeetLinkButton
              platform={data?.platform}
              isEdit={false}
              onClose={() => setShowLinkModal(false)}
            />,
            document.body
          )}
      </>
    );
  };

  const MasterMeetingAfter = () => {
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
            후기 작성
          </ButtonBasic>
        )}
      </>
    );
  };

  return (
    <>
      {todayTime > meetingTime + durationTime
        ? MasterMeetingAfter()
        : todayTime < meetingTime
        ? MasterMeetingBefore()
        : MasterMeetingStart()}
      {showLinkModal &&
        createPortal(
          <DetailMeetLinkButton
            platform={data?.platform}
            isEdit={false}
            onClose={() => setShowLinkModal(false)}
          />,
          document.body
        )}
    </>
  );
};

export default ButtonMeetingMaster;
