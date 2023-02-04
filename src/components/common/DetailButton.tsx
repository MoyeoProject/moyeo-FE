import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { useMeetAttendExit } from '../../hooks/useAttendButton';
import { getEditingMeeting, meetAttendExitApi, meetEntranceApi } from '../../services/api';
import { loadItem, saveItem } from '../../services/storage';
import { ButtonBasic, MasterButton } from '../../styles/DetailButtonStyle';
import ButtonMeetingMaster from '../ButtonMeetingMaster';
import ButtonMeetingMember from '../ButtonMeetingMember';
import { DetailMeetLinkButton, DetailMeetingModal } from '../DetailButtonModal';

const DetailButton = ({
  data,
  member,
  meetingAfter,
  meetingTime,
}: {
  data: any;
  member: any;
  meetingAfter: boolean;
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
    if (meetingAfter && !data?.entrance) {
      return;
    }
  };

  return (
    <>
      {data.master ? (
        <ButtonMeetingMaster data={data} />
      ) : (
        <ButtonMeetingMember data={data} member={member} />
      )}
    </>
  );
};

export default DetailButton;
