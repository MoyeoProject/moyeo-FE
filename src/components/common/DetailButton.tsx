import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { meetingLinkInpitApi } from '../../services/api';

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
const Button = styled.button`
  width: 343px;
  height: 54px;
  border-radius: 8px;
  background-color: #e2806d;
  color: white;
  font-weight: 700;
`;
const ButtonDisabled = styled(Button)`
  background-color: #aaaaaa;
  cursor: default;
`;
const ButtonEdit = styled(Button)`
  background-color: #aaaaaa;
`;
const MasterLinkInput = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: space-between;
  input {
    width: 90%;
    padding-left: 10px;
    border: 1px solid #e2806d;
    border-radius: 8px;
    :focus {
      outline: 1px solid #e2806d;
    }
  }
  button {
    border-radius: 8px;
    background-color: #e2806d;
    height: 100%;
    width: 70px;
    color: white;
    font-weight: 700;
  }
  .cancle {
    background-color: #aaaaaa;
  }
`;
const MasterButton = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default DetailButton;
