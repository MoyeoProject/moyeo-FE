import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { handleAttendAlert, handleAttendCancleAlert } from '../hooks/useAlert';
import { useMeetAttendExit } from '../hooks/useAttendButton';
import useCloseModal from '../hooks/useCloseModal';
import { meetingLinkInpitApi } from '../services/api';
import { ModalButton } from '../styles/ButtonStyle';
import { InputField } from '../styles/FormStyle';
import { ButtonsBox, ModalWrap, Overlay } from '../styles/ModalStyle';

type DetailMeetLinkType = {
  onClose: () => void;
  platform: string;
  isEdit: boolean;
};
type DetailMeetingModalType = {
  onClose: () => void;
  id: string | undefined;
  passwordCheck: string;
};

//상세페이지 하단 - 링크 입력 모달 버튼
export const DetailMeetLinkButton = ({ onClose, platform, isEdit }: DetailMeetLinkType) => {
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

// 상세페이지 상단 - 비밀번호 입력 모달
export const DetailMeetingModal = ({ onClose, id, passwordCheck }: DetailMeetingModalType) => {
  const modalRef = useRef(null);
  useCloseModal(modalRef, onClose);

  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);

  const { mutate: meetAttendExit } = useMeetAttendExit();
  const handleClickAttnedExit = (id: string | undefined) => {
    if (password === passwordCheck) {
      setCheck(false);
      meetAttendExit(id);
      handleAttendAlert(true);
    } else {
      setCheck(true);
    }
  };

  return (
    <Overlay>
      <ModalWrap ref={modalRef}>
        <InputField
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {check ? <p style={{ color: 'red' }}>비밀번호를 확인해주세요</p> : null}
        <ButtonsBox>
          <ModalButton onClick={onClose} isColor={false}>
            취소
          </ModalButton>
          <ModalButton
            onClick={() => {
              handleClickAttnedExit(id);
            }}
            isColor={true}
          >
            입장하기
          </ModalButton>
        </ButtonsBox>
      </ModalWrap>
    </Overlay>
  );
};
