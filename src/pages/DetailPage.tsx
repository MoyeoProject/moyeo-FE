import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Comment from '../components/Comment';
import DetailAttendList from '../components/common/DetailAttendList';
import DetailButton from '../components/common/DetailButton';
import DetailCategories from '../components/common/DetailCategories';
import DetailMeetingInfo from '../components/common/DetailMeetingInfo';
import DetailNavBar from '../components/common/DetailNavBar';
import { getDetailPage } from '../services/api';
import { loadItem, saveItem } from '../services/storage';

const DetailPage = () => {
  const categories = loadItem('detailKeyword');

  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(
    ['detail', id],
    () => {
      return getDetailPage(id);
    },
    {
      // 로딩중일때, 이전 데이터 유지하기 속성
      keepPreviousData: true,
    }
  );

  const detailData = data?.data.data;
  if (isLoading) {
    return <h2>로딩중</h2>;
  }
  return (
    <DetailBox>
      <DetailTopBox>
        <DetailNavBar data={detailData} />
        <DetailCategories />
      </DetailTopBox>
      <DetailMainBox>
        {categories === 'intro' ? (
          <>
            <DetailMeetingInfo data={detailData} isLoading={isLoading} isError={isError} />
            <DetailAttendList data={detailData} />
            <ButtonBox>
              <DetailButton data={detailData} />
            </ButtonBox>
          </>
        ) : (
          <>
            <Comment />
          </>
        )}
      </DetailMainBox>
    </DetailBox>
  );
};
const DetailBox = styled.div`
  height: 812px;
  /* height: 612px; */
  position: relative;
  overflow-y: scroll;
  box-sizing: border-box;
  border: 1px solid gray;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const DetailTopBox = styled.div`
  width: 375px;
  position: sticky;
  top: 0px;
  box-sizing: border-box;
  background-color: white;
  z-index: 10;
`;
const DetailMainBox = styled.div`
  position: relative;
`;
const ButtonBox = styled.div`
  position: sticky;
  bottom: 0;
  padding: 16px;
  box-sizing: border-box;
`;
export default DetailPage;
