import React, { useState } from 'react';
import styled from 'styled-components';

import { isSignup } from '../../modules/authSlice';
import { loadItem, saveItem } from '../../services/storage';
import { useAppDispatch } from '../../store';

const DetailCategories = () => {
  const kakaoShareUser = loadItem('isLogin') === 'kakaoShare';
  return (
    <DetailCategoriesBox>
      <button
        // categories = {categories}
        onClick={() => {
          saveItem('detailKeyword', 'intro');
          window.location.reload();
        }}
      >
        소개
      </button>
      <button
        onClick={() => {
          {
            kakaoShareUser
              ? confirm('로그인이 필요한 페이지입니다. 로그인하시겠습니까?')
                ? location.replace('/')
                : null
              : saveItem('detailKeyword', 'comment');
            window.location.reload();
          }
        }}
      >
        댓글
      </button>
    </DetailCategoriesBox>
  );
};

const DetailCategoriesBox = styled.div`
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  /* 블러처리. */
  button {
    width: 168px;
    height: 100%;
    margin-right: 8px;
    border-bottom: 2px solid #9cc8d2;
    color: #aaaaaa;
    font-weight: 700;
    background-color: white;
  }
  button:last-child {
    margin-right: 0;
  }
`;

export default DetailCategories;
