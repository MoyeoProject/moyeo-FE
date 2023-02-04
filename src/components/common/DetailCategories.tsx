import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import styled from 'styled-components';

import { loadItem, saveItem } from '../../services/storage';

const DetailCategories = ({ isAttend }: any) => {
  const kakaoShareUser = loadItem('isLogin') === 'kakaoShare';
  const isSelect = loadItem('detailKeyword');

  return (
    <DetailCategoriesBox>
      <Button
        selectButton={isSelect === 'intro' ? true : false}
        onClick={() => {
          saveItem('detailKeyword', 'intro');
          window.location.reload();
        }}
      >
        소개
      </Button>
      <Button
        selectButton={isSelect === 'comment' ? true : false}
        onClick={() => {
          if (kakaoShareUser) {
            confirm('로그인이 필요한 페이지입니다. 로그인하시겠습니까?')
              ? location.replace('/')
              : null;
            return;
          }
          if (!isAttend) {
            toast('모임에 참여한 멤버만 볼 수 있습니다.');
            return;
          }
          saveItem('detailKeyword', 'comment');
          window.location.reload();
        }}
      >
        댓글
      </Button>
    </DetailCategoriesBox>
  );
};

const DetailCategoriesBox = styled.div`
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const Button = styled.button<{ selectButton: boolean }>`
  width: 168px;
  height: 100%;
  margin-right: 8px;
  border-bottom: ${(props) => (props.selectButton ? '2px solid #FFA000' : null)};
  color: ${(props) => (props.selectButton ? '#FFA000' : '#aaaaaa')};
  font-weight: 700;
  font-size: 16px;
  background-color: white;
  button:last-child {
    margin-right: 0;
  }
  :hover {
    color: #ffb300;
  }
`;

export default DetailCategories;
