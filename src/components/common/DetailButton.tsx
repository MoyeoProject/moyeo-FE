import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { meetingLinkInpitApi } from '../../services/api';

const DetailButton = ({ data }: any) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState('');
  const [linkInput, setLinkInput] = useState(false);
  const QueryClient = useQueryClient();

  const useMeetingLinkInput = () => {
    return useMutation(meetingLinkInpitApi, {
      onSuccess: () => {
        alert('모임 링크가 개설되었습니다');
        QueryClient.invalidateQueries(['link', id]);
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
      window.location.href = `/${data.link}`;
    }
    // else {
    //   alert('모임 시작 30분 전부터 입장 가능합니다');
    // }
  };

  return (
    <>
      <div>
        {data?.master ? (
          linkInput ? (
            <div>
              <input
                type="text"
                placeholder="입장 링크 입력"
                onChange={(e) => setLink(e.target.value)}
              />
              <button onClick={meetingLinkInputBtn}>입력</button>
            </div>
          ) : data.link ? (
            <>
              <button onClick={meetingEntranceBtn}>모임 입장</button>
              <button
                onClick={() => {
                  setLinkInput(true);
                }}
              >
                입장 링크 수정
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setLinkInput(true);
              }}
            >
              입장 링크를 입력해주세요
            </button>
          )
        ) : data?.attend ? (
          <button onClick={meetingEntranceBtn}>모임 입장</button>
        ) : (
          <div>모임에 참석한 후 입장 가능합니다</div>
        )}
      </div>
    </>
  );
};

export default DetailButton;
