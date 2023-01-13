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
  const { data, isLoading, isError } = useQuery(['detail', id], () => {
    return getDetailPage(id);
  });
  const detailData = data?.data.data;

  return (
    <DetailBox>
      <DetailNavBar data={detailData} />
      <DetailCategories />
      <DetailMiniBox>
        {categories === 'intro' ? (
          <>
            <DetailMeetingInfo data={detailData} isLoading={isLoading} isError={isError} />
            <DetailAttendList data={detailData} />
            <DetailButton data={detailData} />
          </>
        ) : (
          <>
            <Comment />
          </>
        )}
      </DetailMiniBox>
    </DetailBox>
  );
};
const DetailBox = styled.div`
  width: 370px;
  margin: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;
const DetailMiniBox = styled.div`
  padding: 16px;
  box-sizing: border-box;
`;
export default DetailPage;
