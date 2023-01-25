import { useMutation, useQueryClient } from '@tanstack/react-query';

import { meetAttendExitApi } from '../services/api';
import { loadItem } from '../services/storage';

export const useMeetAttendExit = () => {
  const QueryClient = useQueryClient();

  const kakaoShareUser = loadItem('isLogin') === 'kakaoShare';

  return useMutation(meetAttendExitApi, {
    onSuccess: (data) => {
      QueryClient.invalidateQueries();
      data?.data.data !== undefined ? alert('참여완료') : alert('모임을 취소하셨습니다.');
    },
    onError: (err: any) => {
      if (kakaoShareUser) {
        if (confirm('로그인이 필요한 페이지입니다. 로그인하시겠습니까?')) {
          location.replace('/');
        }
      }
      return alert(err.response.data.statusMsg);
    },
  });
};
