import { useEffect, useState } from 'react';

import { loadItem } from './storage';

export const AlarmConnect = () => {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState('');
  const id = loadItem('userId');

  useEffect(() => {
    // 알람 구독을 안 한 상태면 알람 연결해라
    if (!listening) {
      const subscribeUrl = `https://sparta-hippo.shop/api/alarm/subscribe/${id}`;
      const eventSource = new EventSource(subscribeUrl);

      eventSource.addEventListener('sse', async (e) => {
        const result = await e.data;
        setData(result);
        setListening(true);
      });

      eventSource.addEventListener('error', function (event) {
        eventSource.close();
      });
    }
  }, []);

  if (data.split(',')[1] !== undefined) {
    alert(data.split(',')[1].split(':')[1]);
  }
};
