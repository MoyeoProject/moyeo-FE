import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';

import { useMeetAttendExit } from '../../hooks/useAttendButton';
import { getEditingMeeting, meetAttendExitApi } from '../../services/api';
import { loadItem, saveItem } from '../../services/storage';
import { ButtonBasic, MasterButton } from '../../styles/DetailButtonStyle';
import { DetailMeetLinkButton, DetailMeetingModal } from '../DetailButtonModal';

const DetailButton = ({ data, member }: any) => {
  const QueryClient = useQueryClient();

  const kakaoShareUser = loadItem('isLogin') === 'kakaoShare';
  const { id } = useParams();
  const ids = Number(id);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const meetingEntranceBtn = () => {
    if (data.link) {
      window.open(`${data?.link}`);
    }
    // else {
    //  알람기능 되면 test
    //  toast('모임 시작 30분 전부터 입장 가능합니다');
    // }
  };

  const { mutate: meetAttendExit } = useMeetAttendExit();
  const handleClickAttnedExit = (ids: number | undefined) => {
    meetAttendExit(ids);
  };

  const linkEdit = () => {
    navigate(`/post/${id}`);
    getEditingMeeting(ids);
  };

  return (
    <>
      {data?.master ? (
        <>
          {data?.link !== '' ? (
            <MasterButton>
              <ButtonBasic activeBtn={true} cursorAct={true} onClick={meetingEntranceBtn}>
                입장하기
              </ButtonBasic>
              <ButtonBasic activeBtn={false} cursorAct={true} onClick={linkEdit}>
                입장 링크 수정
              </ButtonBasic>
            </MasterButton>
          ) : (
            <>
              <ButtonBasic activeBtn={false} cursorAct={true} onClick={() => setShowModal(true)}>
                입장 링크를 입력해주세요
              </ButtonBasic>
              {showModal &&
                createPortal(
                  <DetailMeetLinkButton
                    platform={data?.platform}
                    isEdit={false}
                    onClose={() => setShowModal(false)}
                  />,
                  document.body
                )}
            </>
          )}
        </>
      ) : data?.attend ? (
        !data?.link ? (
          <ButtonBasic activeBtn={false} cursorAct={false}>
            모임이 아직 시작되지 않았습니다
          </ButtonBasic>
        ) : (
          <ButtonBasic onClick={meetingEntranceBtn} activeBtn={true} cursorAct={true}>
            입장하기
          </ButtonBasic>
        )
      ) : member?.length === data?.maxNum ? (
        <ButtonBasic activeBtn={false}>정원이 다 찼습니다</ButtonBasic>
      ) : (
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
          모임 참석하기
        </ButtonBasic>
      )}
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

export default DetailButton;
