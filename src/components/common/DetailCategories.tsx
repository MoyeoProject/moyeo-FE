import React, { useState } from 'react';
import styled from 'styled-components';

import { loadItem, saveItem } from '../../services/storage';

const DetailCategories = () => {
  const categories = loadItem('detailKeyword');

  return (
    <DetailCategoriesBox>
      <CaregoriesButton
        // categories = {categories}
        onClick={() => {
          saveItem('detailKeyword', 'intro');
          window.location.reload();
        }}
      >
        소개
      </CaregoriesButton>
      <CaregoriesButton
        onClick={() => {
          saveItem('detailKeyword', 'comment');
          window.location.reload();
        }}
      >
        댓글
      </CaregoriesButton>
    </DetailCategoriesBox>
  );
};
const DetailCategoriesBox = styled.div`
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;

  /* 블러처리. */
`;
const CaregoriesButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: white;
  /* 버튼 클릭하면 왔다갔다 */
`;
export default DetailCategories;
