import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { meetingLinkInpitApi } from '../../services/api';
import { ButtonDisabled, ButtonEdit, MasterButton, MasterLinkInput } from '../../styles/DetailButtonStyle';

const DetailButton = ({ data }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState('');
  const [linkInput, setLinkInput] = useState(false);
  const QueryClient = useQueryClient();

  const useMeetingLinkInput = () => {
    return useMutation(meetingLinkInpitApi, {
      onSuccess: (data) => {
        alert('모임 링크가 개설되었습니다');
        QueryClient.invalidateQueries(['link', id]);
        console.log('링크생성', data);
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
    meetingLinkInput({ link, platform: data.platform, id });
  };

  const meetingEntranceBtn = () => {
    if (data.link) {
      alert(`${data.platform}으로 입장합니다`);
      window.location.href = `${data.link}`;
    }
    // else {
    //   alert('모임 시작 30분 전부터 입장 가능합니다');
    // }
  };

  return (
    <>
      {data?.master ? (
        <>
          {linkInput ? (
            <MasterLinkInput>
              <input
                placeholder="입장 링크를 입력해주세요"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
              />
              <button className="enter" onClick={meetingLinkInputBtn}>
                입력
              </button>
              <button
                className="cancle"
                onClick={() => {
                  setLinkInput(false);
                }}
              >
                취소
              </button>
            </MasterLinkInput>
          ) : data?.link !== '' ? (
            <MasterButton>
              <Button onClick={meetingEntranceBtn}>모임입장</Button>
              <ButtonEdit
                onClick={() => {
                  setLinkInput(true);
                }}
              >
                입장 링크 수정
              </ButtonEdit>
            </MasterButton>
          ) : (
            <Button
              onClick={() => {
                setLinkInput(true);
              }}
            >
              입장 링크를 입력해주세요
            </Button>
          )}
        </>
      ) : data?.attend ? (
        <Button onClick={meetingEntranceBtn}>모임 입장</Button>
      ) : (
        <ButtonDisabled>모임에 참석한 후 입장 가능합니다</ButtonDisabled>
      )}
    </>
  );
};

export default DetailButton;
