import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as Icon_ChevronLeft } from '../../assets/chevron-left.svg';
import { ReactComponent as Icon_AlarmOff } from '../../assets/n_alarm_off.svg';
import { ReactComponent as Icon_AlarmOn } from '../../assets/n_alarm_on.svg';
import { ReactComponent as Icon_Enter } from '../../assets/n_enter.svg';
import { ReactComponent as Icon_Out } from '../../assets/n_out.svg';
import { ReactComponent as Icon_Pencil } from '../../assets/n_pencil.svg';
import { handleAttendAlert } from '../../hooks/useAlert';
import { useMeetAttendExit } from '../../hooks/useAttendButton';
import { getAlarmApi, getEditingMeeting } from '../../services/api';
import { loadItem, saveItem } from '../../services/storage';
import { NavBox, NavButtonBox } from '../../styles/DetailNavBarStyle';
import { DetailMeetingModal } from '../DetailButtonModal';
import KakaoShareButton from '../KakaoShareButton';

const DetailNavBar = ({ data, meetingStart }: { data: any; meetingStart: boolean }) => {
  const [showModal, setShowModal] = useState(false);

  const kakaoShareUser = loadItem('isLogin') === 'kakaoShare';
  const { id } = useParams();
  const ids = Number(id);

  const QueryClient = useQueryClient();
  const navigate = useNavigate();

  const shareData = {
    link: `detail/${data?.id}`,
    title: data?.title,
    content: data?.content,
  };

  const handleClickMeetingEdit = (ids: number | undefined) => {
    navigate(`/post/${ids}`);
    getEditingMeeting(ids);
  };

  const { mutate: meetAttendExit } = useMeetAttendExit();
  const handleClickAttnedExit = (ids: number | undefined) => {
    meetAttendExit(ids);
  };

  const useGetAlarm = () => {
    return useMutation(getAlarmApi, {
      onSuccess: () => {
        QueryClient.invalidateQueries();
      },
    });
  };
  const { mutate: getAlarm } = useGetAlarm();
  const handleClickAlarm = (id: string | undefined) => {
    getAlarm(id);
  };

  return (
    <>
      <NavBox>
        <div>
          <div
            className="navArrow"
            onClick={() => {
              {
                kakaoShareUser
                  ? confirm('로그인이 필요한 페이지입니다. 로그인하시겠습니까?')
                    ? location.replace('/')
                    : null
                  : navigate('/main');
                saveItem('detailKeyword', 'intro');
              }
            }}
          >
            <Icon_ChevronLeft />
          </div>
          <p className="navTitle">{data?.title}</p>
        </div>

        <NavButtonBox>
          {!meetingStart ? (
            data?.attend ? (
              <div
                onClick={() => {
                  handleClickAlarm(id);
                }}
              >
                {data?.alarm ? (
                  <span>
                    <Icon_AlarmOn />
                  </span>
                ) : (
                  <span>
                    <Icon_AlarmOff />
                  </span>
                )}
              </div>
            ) : null
          ) : null}

          <KakaoShareButton shareData={shareData} />

          {!meetingStart ? (
            data?.master ? (
              <div
                onClick={() => {
                  handleClickMeetingEdit(ids);
                }}
              >
                <span>
                  <Icon_Pencil />
                </span>
              </div>
            ) : (
              <div
                onClick={() => {
                  if (!data?.attend) {
                    if (data.secret) {
                      setShowModal(true);
                    } else {
                      handleAttendAlert(true);
                      handleClickAttnedExit(ids);
                    }
                  } else {
                    handleAttendAlert(false, id);
                  }
                }}
              >
                {data?.attend ? (
                  <span>
                    <Icon_Out />
                  </span>
                ) : (
                  <span>
                    <Icon_Enter />
                  </span>
                )}
              </div>
            )
          ) : null}
        </NavButtonBox>
      </NavBox>

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

export default DetailNavBar;
