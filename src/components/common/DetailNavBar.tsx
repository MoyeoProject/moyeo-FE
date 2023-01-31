import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as ChevronLeft } from '../../assets/chevron-left.svg';
import { handleAttendAlert } from '../../hooks/useAlert';
import { useMeetAttendExit } from '../../hooks/useAttendButton';
import { getAlarmApi, getEditingMeeting, meetAttendExitApi } from '../../services/api';
import { loadItem, saveItem } from '../../services/storage';
import { NavBox, NavButtonBox } from '../../styles/DetailNavBarStyle';
import { DetailMeetingModal } from '../DetailButtonModal';
import KakaoShareButton from '../KakaoShareButton';
import ModalForm from './ModalForm';

const DetailNavBar = ({ data }: any) => {
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
    data?.attend ? getAlarm(id) : toast('모임 참석하기 후, 알람 설정이 가능합니다');
  };
  console.log(data);

  return (
    <>
      <NavBox>
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
          <ChevronLeft />
        </div>

        <p className="navTitle">{data?.title}</p>

        <NavButtonBox>
          <div
            onClick={() => {
              handleClickAlarm(id);
            }}
          >
            {data?.alarm ? <span>🔔</span> : <span>🔕</span>}
          </div>

          <KakaoShareButton shareData={shareData} />

          {data?.master ? (
            <div
              onClick={() => {
                handleClickMeetingEdit(ids);
              }}
            >
              <span>✒️</span>
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
              {data?.attend ? <span>➡️</span> : <span>⬅️</span>}
            </div>
          )}
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
