import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { meetingLinkInpitApi } from '../services/api';
import { ModalButton } from '../styles/ButtonStyle';
import { ButtonsWrap, InputField, ModalFormWrap, Overlay } from '../styles/ModalFormStyle';

type DetailModalFormProps = {
  onClose: () => void;
  platform: string;
  isEdit: boolean;
};

const DetailMeetLinkButton = ({ onClose, platform, isEdit }: DetailModalFormProps) => {
  const QueryClient = useQueryClient();
  const { id } = useParams();
  const [link, setLink] = useState('');

  const useMeetingLinkInput = () => {
    return useMutation(meetingLinkInpitApi, {
      onSuccess: (data) => {
        alert('모임 링크가 개설되었습니다');
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
      alert('링크를 입력해주세요');
      return;
    }
    meetingLinkInput({ link, id, platform });
  };

  return (
    <Overlay>
      <ModalFormWrap>
        <InputField
          placeholder={isEdit ? '수정된 링크를 입력해주세요' : '입장 링크를 입력해주세요'}
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <ButtonsWrap>
          <ModalButton onClick={meetingLinkInputBtn} isColor={true}>
            {isEdit ? '수정완료' : '입력'}
          </ModalButton>
          <ModalButton onClick={onClose} isColor={false}>
            취소
          </ModalButton>
        </ButtonsWrap>
      </ModalFormWrap>
    </Overlay>
  );
};

export default DetailMeetLinkButton;
