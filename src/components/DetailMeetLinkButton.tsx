import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { meetAttendExitApi, meetingLinkInpitApi } from '../services/api';
import { ModalButton } from '../styles/ButtonStyle';
import { InputField } from '../styles/FormStyle';
import { ButtonsBox, ModalWrap, Overlay } from '../styles/ModalStyle';

type DetailModalFormProps = {
  onClose: () => void;
  platform: string;
  isEdit: boolean;
};

export const DetailMeetLinkButton = ({ onClose, platform, isEdit }: DetailModalFormProps) => {
  const QueryClient = useQueryClient();
  const { id } = useParams();
  const [link, setLink] = useState('');

  const useMeetingLinkInput = () => {
    return useMutation(meetingLinkInpitApi, {
      onSuccess: (data) => {
        alert('모임 링크가 개설되었습니다.');
        QueryClient.invalidateQueries(['link', id]);
        window.location.reload();
      },
      onError: (data: any) => {
        alert(data?.response.data.statusMsg);
      },
    });
  };

  const { mutate: meetingLinkInput } = useMeetingLinkInput();
  const meetingLinkInputBtn = () => {
    if (link === '') {
      alert('링크를 입력해주세요.');
      return;
    }
    meetingLinkInput({ link, id, platform });
  };

  return (
    <Overlay>
      <ModalWrap>
        <InputField
          placeholder={isEdit ? '수정된 링크를 입력해주세요.' : '입장 링크를 입력해주세요.'}
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <ButtonsBox>
          <ModalButton onClick={onClose} isColor={false}>
            취소
          </ModalButton>
          <ModalButton onClick={meetingLinkInputBtn} isColor={true}>
            {isEdit ? '수정완료' : '입력'}
          </ModalButton>
        </ButtonsBox>
      </ModalWrap>
    </Overlay>
  );
};

type DetailMeetPasswordProps = {
  onClose: () => void;
};

export const DetailMeetPassword = ({ onClose }: DetailMeetPasswordProps) => {
  const QueryClient = useQueryClient();
  const { id } = useParams();
  const [password, setPassword] = useState('');

  const useMeetAttendExit = () => {
    return useMutation(meetAttendExitApi, {
      onSuccess: (data) => {
        QueryClient.invalidateQueries();
        data?.data.data !== undefined ? alert('참여완료') : alert('모임을 취소하셨습니다.');
      },
      onError: (err: any) => {
        return alert(err.response.data.statusMsg);
      },
    });
  };
  const { mutate: meetAttendExit } = useMeetAttendExit();
  const handleClickAttnedExit = (id: any) => {
    if (password === '') {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    // if (password === )
    console.log(id)
    meetAttendExit({ id });
  };

  return (
    <Overlay>
      <ModalWrap>
        <InputField
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <ButtonsBox>
          <ModalButton onClick={onClose} isColor={false}>
            취소
          </ModalButton>
          <ModalButton onClick={handleClickAttnedExit} isColor={true}>
            입력
          </ModalButton>
        </ButtonsBox>
      </ModalWrap>
    </Overlay>
  );
};
