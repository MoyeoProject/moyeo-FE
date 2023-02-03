import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { makeFollowApi } from '../../services/api';
import { loadItem } from '../../services/storage';
import { FollowStyleButton } from '../../styles/DetailButtonStyle';
import { MemberTypes } from '../../types/DetailTypes';

export const FollowButton = ({ userId, followed }: MemberTypes) => {
  const [isFollow, setIsFollow] = useState(followed);
  const myId = Number(loadItem('userId'));

  const useMakeFollow = () => {
    const QueryClient = useQueryClient();
    return useMutation(makeFollowApi, {
      onSuccess: () => {
        QueryClient.invalidateQueries(['follow']);
        setIsFollow(!isFollow);
      },
    });
  };

  const { mutate: makeFollow } = useMakeFollow();
  const handleClickFollow = () => {
    if (!isFollow) {
      return makeFollow({ userId });
    }
    if (isFollow) {
      Swal.fire({
        position: 'center',
        width: '365px',
        text: '팔로우를 취소하시겠습니까?',
        confirmButtonText: '네',
        cancelButtonText: '취소',
        icon: 'warning',
        iconColor: '#F1F1F1',
        showCancelButton: true,
        confirmButtonColor: '#aaaaaa',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          makeFollow({ userId });
          return;
        }
      });
    }
  };

  return (
    <>
      {userId == myId ? null : (
        <FollowStyleButton
          BGcolor={isFollow ? '#F4F4F4' : '#FFF1DB'}
          color={isFollow ? '#666666' : '#FF9C07'}
          onClick={handleClickFollow}
        >
          {isFollow ? '팔로잉' : '팔로우'}
        </FollowStyleButton>
      )}
    </>
  );
};
