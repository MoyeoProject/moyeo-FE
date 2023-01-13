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
      <div>
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
      </div>
    </DetailBox>
  );
};
const DetailBox = styled.div`
  width: 370px;
  border: 1px solid red;
  padding: 16px;
  box-sizing: border-box;
`;
export default DetailPage;
