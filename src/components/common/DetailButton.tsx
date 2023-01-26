import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';

import { useMeetAttendExit } from '../../hooks/useAttendButton';
import { meetAttendExitApi } from '../../services/api';
import { loadItem, saveItem } from '../../services/storage';
import { ButtonBasic, MasterButton } from '../../styles/DetailButtonStyle';
import { DetailMeetLinkButton } from '../DetailMeetLinkButton';

const DetailButton = ({ data, member }: any) => {
  const QueryClient = useQueryClient();

  const kakaoShareUser = loadItem('isLogin') === 'kakaoShare';
  const { id } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const meetingEntranceBtn = () => {
    if (data.link) {
      window.open(`${data?.link}`);
    }
    // else {
    //  알람기능 되면 test
    //  alert('모임 시작 30분 전부터 입장 가능합니다');
    // }
  };

  const { mutate: meetAttendExit } = useMeetAttendExit();
  const handleClickAttnedExit = (id: string | undefined) => {
    meetAttendExit(id);
  };

  const editData = {
    title: data?.title,
    category: data.category,
    startDate: data.startDate,
    startTime: data.startTime,
    duration: data.duration,
    platform: data.platform,
    link: data.link,
    content: data.content,
    maxNum: data.maxNum,
    secret: data.secret,
    password: data.password,
  };

  const linkEdit = () => {
    console.log(data);
    // saveItem(JSON.stringify('currPost', editData));
    navigate(`/post/${id}`);
  };

  return (
    <>
      {data?.master ? (
        <>
          {data?.link !== '' ? (
            <MasterButton>
              <ButtonBasic activeBtn={true} cursorAct={true} onClick={meetingEntranceBtn}>
                모임입장
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
            링크 개설 전 입니다
          </ButtonBasic>
        ) : (
          <ButtonBasic onClick={meetingEntranceBtn} activeBtn={true} cursorAct={true}>
            모임 입장 - 모임 장소로 이동
          </ButtonBasic>
        )
      ) : member?.length === data?.maxNum ? (
        <ButtonBasic activeBtn={false}>정원이 다 찼습니다</ButtonBasic>
      ) : (
        <ButtonBasic
          onClick={() => {
            handleClickAttnedExit(id);
          }}
          activeBtn={true}
          cursorAct={true}
        >
          모임에 참석한 후 입장 가능합니다. 모임참석하기
        </ButtonBasic>
      )}
    </>
  );
};

export default DetailButton;
