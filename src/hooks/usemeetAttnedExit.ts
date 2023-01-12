import { useMutation, useQueryClient } from '@tanstack/react-query';

import { meetAttendExitApi } from '../services/api';

export const useMeetAttendExit = () => {
  const QueryClient = useQueryClient();
  return useMutation(meetAttendExitApi, {
    onSuccess: () => {
      QueryClient.invalidateQueries();
    },
    onError: (err: any) => {
      return alert(err.response.data.statusMsg);
    },
  });
};

const { mutate: meetAttendExit } = useMeetAttendExit();
export const ClickAttnedExit = (id: any) => {
  meetAttendExit(id);
};
