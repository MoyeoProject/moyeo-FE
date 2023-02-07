import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import ButtonMeetingMaster from '../components/ButtonMeetingMaster';
import ButtonMeetingMember from '../components/ButtonMeetingMember';
import Comment from '../components/Comment';
import DetailAttendList from '../components/common/DetailAttendList';
import DetailCategories from '../components/common/DetailCategories';
import DetailMeetingInfo from '../components/common/DetailMeetingInfo';
import DetailNavBar from '../components/common/DetailNavBar';
import { getAttendList, getDetailPage } from '../services/api';
import { loadItem, saveItem } from '../services/storage';
import { DetailBox } from '../styles/DetailPageStyle';

const DetailPage = () => {
  const categories = loadItem('detailKeyword');
  const { id } = useParams();

  useEffect(() => {
    return () => {
      saveItem('keyword', 'popular');
      saveItem('category', '');
      saveItem('year', '');
      saveItem('month', '');
    };
  }, []);

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

  const today = new Date();
  const todayTime = today.getTime();
  const durationTime = detail?.data.data.duration * 3600000;

  const startDate = detail?.data.data.startDate;
  const startTime = detail?.data.data.startTime;
  const meetingTime = new Date(startDate + 'T' + startTime).getTime();
  const meetingAfter = todayTime > meetingTime + durationTime;

  const detailData = detail?.data.data;
  const memberData = member?.data.data;
  const isAttend = detail?.data.data.attend;

  if (isLoading) {
    return <h2>로딩중</h2>;
  }
  if (!loadItem('isLogin')) {
    saveItem('isLogin', 'kakaoShare');
    saveItem('detailKeyword', 'intro');
    toast(
      '"모여"에 초대받으셨군요! 환영합니다😊 로그인 / 회원가입이 필요한 페이지가 있을 수 있습니다'
    );
  }

  return (
    <>
      <DetailBox>
        <div className="detailTopBox">
          <DetailNavBar data={detailData} member={memberData} meetingAfter={meetingAfter} />
          <DetailCategories isAttend={isAttend} meetingAfter={meetingAfter} />
        </div>
        <div className="detailMainBox">
          {categories === 'intro' ? (
            <>
              <DetailMeetingInfo data={detailData} meetingAfter={meetingAfter} />
              <DetailAttendList data={detailData} member={memberData} meetingAfter={meetingAfter} />
              <div className="buttonBox">
                {detailData.master ? (
                  <ButtonMeetingMaster data={detailData} />
                ) : (
                  <ButtonMeetingMember data={detailData} member={member} />
                )}
              </div>
            </>
          ) : (
            <>
              <Comment meetingAfter={meetingAfter} />
            </>
          )}
        </div>
      </DetailBox>
    </>
  );
};

export default DetailPage;
