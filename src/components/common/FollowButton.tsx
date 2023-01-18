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
        <FollowStyleButton
          BGcolor={isFollow ? '#E9E9E9' : '#9CC8D2'}
          color={isFollow ? '#666666' : '#FFFFFF'}
          fontWeight={isFollow ? '500' : '700'}
          onClick={handleClickFollow}
        >
          {isFollow ? '언 팔로우' : '팔로우'}
        </FollowStyleButton>
      )}
    </>
  );
};

const FollowStyleButton = styled.button<{ BGcolor: string; color: string; fontWeight: string }>`
  width: 65px;
  height: 32px;
  border-radius: 4px;
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontWeight};
  font-size: 12px;
  line-height: 16px;
  background-color: ${(props) => props.BGcolor};
`;
export default FollowButton;
