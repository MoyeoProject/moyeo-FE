import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { meetAttendExitApi } from '../services/api';
import { loadItem } from '../services/storage';
import { handleAttendAlert } from './useAlert';

export const useMeetAttendExit = () => {
  const QueryClient = useQueryClient();

  const kakaoShareUser = loadItem('isLogin') === 'kakaoShare';

  return useMutation(meetAttendExitApi, {
    onSuccess: (data) => {
      QueryClient.invalidateQueries();
      data?.data.data !== undefined ? handleAttendAlert(true) : handleAttendAlert(false);
    },
    onError: (err: any) => {
      if (kakaoShareUser) {
        if (confirm('로그인이 필요한 페이지입니다. 로그인하시겠습니까?')) {
          location.replace('/');
        }
      }
      return toast(err.response.data.statusMsg);
    },
  });
};
