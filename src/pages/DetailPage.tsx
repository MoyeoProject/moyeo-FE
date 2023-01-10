import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Comment from '../components/Comment';
import DetailAttendList from '../components/common/DetailAttendList';
import DetailMeetingInfo from '../components/common/DetailMeetingInfo';
import DetailNavBar from '../components/common/DetailNavBar';

const DetailPage = () => {
  const navigate = useNavigate();

  const [categories, setCategoreis] = useState('intro');

  return (
    <div style={{ width: '370px' }}>
      <DetailNavBar />
      {/* <DetailCategories /> */}
      <div className="detail_tab">
        <button type="button" onClick={() => setCategoreis('intro')}>
          소개
        </button>
        <button type="button" onClick={() => setCategoreis('comment')}>
          댓글
        </button>
      </div>

      <div>
        {categories === 'intro' ? (
          <>
            <p>소개</p>
            <DetailMeetingInfo />
            <DetailAttendList />
            <div>
              <button>입장 링크 입력</button>
            </div>
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
