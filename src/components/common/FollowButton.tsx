import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

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
    if (isFollow && confirm('팔로우 취소하시겠습니까?')) {
      makeFollow({ userId });
      return;
    }
  };

  return (
    <>
      {userId == myId ? null : (
        <FollowStyleButton
          BGcolor={isFollow ? '#E9E9E9' : '#9CC8D2'}
          color={isFollow ? '#666666' : '#FFFFFF'}
          fontWeight={isFollow ? '500' : '700'}
          onClick={handleClickFollow}
        >
          {isFollow ? '팔로잉' : '팔로우'}
        </FollowStyleButton>
      )}
    </>
  );
};
