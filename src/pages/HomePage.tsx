import { useSelector } from 'react-redux';

import ListCategories from '../components/common/ListCategories';
import TopNavBar from '../components/common/TopNavBar';
import useSetMeetingList from '../hooks/useSetMeetingList';
import { Meeting } from '../types/Meeting';

type AppState = { appReducer: { meetingList: Meeting[] } };

export default function HomePage() {
  const { meetingList } = useSelector((state: AppState) => state.appReducer);
  const { isLoading, isError } = useSetMeetingList();

  return (
    <>
      {isLoading ? <div>로딩중 입니다...</div> : null}
      {isError ? <div>에러가 발생...</div> : null}
      <TopNavBar />
      <ListCategories />
    </>
  );
}
