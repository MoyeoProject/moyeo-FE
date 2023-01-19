import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import Comment from '../components/Comment';
import DetailAttendList from '../components/common/DetailAttendList';
import DetailButton from '../components/common/DetailButton';
import DetailCategories from '../components/common/DetailCategories';
import DetailMeetingInfo from '../components/common/DetailMeetingInfo';
import DetailNavBar from '../components/common/DetailNavBar';
import { getDetailPage } from '../services/api';
import { loadItem, saveItem } from '../services/storage';
import { DetailBox } from '../styles/DetailPageStyle';

const DetailPage = () => {
  const categories = loadItem('detailKeyword');
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery(
    ['detail', id],
    () => {
      // if (!loadItem('isLogin')) {
      //   alert(
      //     '"모여"에 초대받으셨군요! 환영합니다😊 로그인 / 회원가입이 필요한 페이지가 있을 수 있습티다'
      //   );
      // }
      // saveItem('detailKeyword', 'intro');
      // console.log(loadItem('detailKeyword'));
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
              <DetailAttendList data={detailData} />
              <div className="buttonBox">
                <DetailButton data={detailData} />
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
