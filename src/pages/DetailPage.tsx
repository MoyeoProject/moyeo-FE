import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Comment from '../components/Comment';
import DetailAttendList from '../components/common/DetailAttendList';
import DetailButton from '../components/common/DetailButton';
import DetailMeetingInfo from '../components/common/DetailMeetingInfo';
import DetailNavBar from '../components/common/DetailNavBar';
import { getDetailPage } from '../services/api';
import { useAppSelector } from '../store';

const DetailPage = () => {
  const [categories, setCategoreis] = useState('intro');

  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(['detail', id], () => {
    return getDetailPage(id);
  });
  const detailData = data?.data.data;

  return (
    <div style={{ width: '370px' }}>
      <DetailNavBar data={detailData} />

      {/* <DetailCategories /> */}
      <div style={{ margin: '15px' }}>
        <button type="button" onClick={() => setCategoreis('intro')}>
          소개 --- /
        </button>
        <button type="button" onClick={() => setCategoreis('comment')}>
          / ----댓글
        </button>
      </div>

      <div>
        {categories === 'intro' ? (
          <>
            <p>소개</p>
            <DetailMeetingInfo data={detailData} isLoading={isLoading} isError={isError} />
            <DetailAttendList data={detailData} />
            <DetailButton data={detailData} />
          </>
        ) : (
          <>
            <p>댓글</p>
            <Comment />
          </>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
