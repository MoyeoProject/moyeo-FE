import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';

import { makeFollowApi } from '../../services/api';
import { loadItem } from '../../services/storage';
import { MemberTypes } from '../../types/DetailTypes';

const FollowButton = ({ userId, followed }: MemberTypes) => {
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
    makeFollow({ userId });
  };

  return (
    <>
      {userId == myId ? null : (
        <FollowStyleButton color={isFollow ? '#aaaaaa' : '#e2806d'} onClick={handleClickFollow}>
          {isFollow ? '팔로우 취소' : '팔로우'}
        </FollowStyleButton>
      )}
    </>
  );
};

const FollowStyleButton = styled.button`
  width: 65px;
  height: 32px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  color: white;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
`;
export default FollowButton;
