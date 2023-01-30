import React, { useEffect, useState } from 'react';

import { InfoNav } from '../pages/FollowPage';
import { loadItem } from '../services/storage';
import { InfoBox } from '../styles/InfoBoxStyle';

export const InfoPrivacy = () => {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);
  const id = loadItem('userId');

  useEffect(() => {
    // 알람 구독을 안 한 상태면 알람 연결해라
    if (!listening) {
      const subscribeUrl = `https://sparta-hippo.shop/api/alarm/subscribe/${id}`;
      const eventSource = new EventSource(subscribeUrl);

      eventSource.addEventListener('sse', async (e) => {
        // console.log('알람연결 성공', e.data);
        const result = await e.data;
        setData(result);
        setListening(true);
      });
      console.log(data);

      eventSource.addEventListener('error', function (event) {
        eventSource.close();
      });
    }
  }, []);

  return (
    <>
      <InfoBox>
        <InfoNav children={'개인정보'} />
      </InfoBox>
      <div>{data}</div>
    </>
  );
};
