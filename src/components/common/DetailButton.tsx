import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { useMeetAttendExit } from '../../hooks/useAttendButton';
import { getEditingMeeting, meetAttendExitApi, meetEntranceApi } from '../../services/api';
import { loadItem, saveItem } from '../../services/storage';
import { ButtonBasic, MasterButton } from '../../styles/DetailButtonStyle';
import { DetailMeetLinkButton, DetailMeetingModal } from '../DetailButtonModal';

const DetailButton = ({
  data,
  member,
  meetingStart,
  meetingTime,
}: {
  data: any;
  member: any;
  meetingStart: boolean;
  meetingTime: number;
}) => {
  const { id } = useParams();
  const ids = Number(id);
  const navigate = useNavigate();

  const QueryClient = useQueryClient();
  const kakaoShareUser = loadItem('isLogin') === 'kakaoShare';
  const entrance = loadItem('meetEntrance');
  const reviewAdd = loadItem('reviewAdd');

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const linkEdit = () => {
    navigate(`/post/${id}`);
    getEditingMeeting(ids);
  };

  useEffect(() => {
    MeetingEntranceAlert();
  }, []);

  const MeetingEntranceAlert = () => {
    if (meetingStart && !data?.entrance) {
      toast(`${data?.title}의 모임이 시작되었습니다`);
      return;
    }
  };

  console.log(data);
  return (
    <>
      {meetingStart ? (
        // !data?.entrance ? (
        //   alert(`${data?.title}의 모임이 시작되었습니다`)
        // ):
        !data?.entrance ? (
          <ButtonBasic activeBtn={true} cursorAct={true} onClick={meetingEntranceBtn}>
            입장하기
          </ButtonBasic>
        ) : reviewAdd === '' ? (
          <ButtonBasic
            activeBtn={true}
            cursorAct={true}
            onClick={() => {
              navigate(`/review/${id}`);
            }}
          >
            후기남기기
          </ButtonBasic>
        ) : (
          <ButtonBasic activeBtn={false} cursorAct={false}>
            이미 완료된 모임입니다.
          </ButtonBasic>
        )
      ) : data?.master ? (
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
              <ButtonBasic
                activeBtn={false}
                cursorAct={true}
                onClick={() => setShowLinkModal(true)}
              >
                입장 링크를 입력해주세요
              </ButtonBasic>
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
