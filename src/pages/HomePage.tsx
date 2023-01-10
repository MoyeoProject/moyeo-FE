import { useSelector } from 'react-redux';

import Calendar from '../components/Calendar';
import MeetingList from '../components/MeetingList';
import SearchForm from '../components/SearchForm';
import ListCategories from '../components/common/ListCategories';
import TopNavBar from '../components/common/TopNavBar';
import useSetMeetingList from '../hooks/useSetMeetingList';
import { loadItem } from '../services/storage';
import { AppState } from '../types/AppTypes';

export default function HomePage() {
  const { isLoading, isError } = useSetMeetingList();
  const sortbyKeyword = loadItem('keyword');
  const { meetingList } = useSelector((state: AppState) => state.home);

  return (
    <>
      {isLoading && <div>로딩중 입니다...</div>}
      {isError && <div>에러가 발생...</div>}
      <TopNavBar />
      <ListCategories />
      <SearchForm />
      {sortbyKeyword === 'calendar' && <Calendar />}
      {meetingList && meetingList.length !== 0 && <MeetingList currMeetingList={meetingList} />}
    </>
  );
}
