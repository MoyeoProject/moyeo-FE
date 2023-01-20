import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import Comment from '../components/Comment';
import DetailAttendList from '../components/common/DetailAttendList';
import DetailButton from '../components/common/DetailButton';
import DetailCategories from '../components/common/DetailCategories';
import DetailMeetingInfo from '../components/common/DetailMeetingInfo';
import DetailNavBar from '../components/common/DetailNavBar';
import { getAttendList, getDetailPage } from '../services/api';
import { loadItem, saveItem } from '../services/storage';
import { DetailBox } from '../styles/DetailPageStyle';

const DetailPage = () => {
  const categories = loadItem('detailKeyword');
  const { id } = useParams();
  const {
    data: detail,
    isLoading,
    isError,
  } = useQuery(['detail', id], () => {
    return getDetailPage(id);
  });

  const { data: member } = useQuery(['member'], () => {
    return getAttendList(id);
  });

  const detailData = detail?.data.data;
  const memberData = member?.data.data;

  if (isLoading) {
    return <h2>로딩중</h2>;
  }
  if (!loadItem('isLogin')) {
    saveItem('isLogin', 'kakaoShare');
    saveItem('detailKeyword', 'intro');
    alert(
      '"모여"에 초대받으셨군요! 환영합니다😊 로그인 / 회원가입이 필요한 페이지가 있을 수 있습니다'
    );
  }

  return (
    <>
      <DetailBox>
        <div className="detailTopBox">
          <DetailNavBar data={detailData} />
          <DetailCategories />
        </div>
        <div className="detailMainBox">
          {categories === 'intro' ? (
            <>
              <DetailMeetingInfo data={detailData} isLoading={isLoading} isError={isError} />
              <DetailAttendList data={detailData} member={memberData} />
              <div className="buttonBox">
                <DetailButton data={detailData} member={memberData} />
              </div>
            </>
          ) : (
            <>
              <Comment />
            </>
          )}
        </div>
      </DetailBox>
    </>
  );
};

export default DetailPage;
