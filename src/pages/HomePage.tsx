import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Calendar from '../components/Calendar';
import MeetingList from '../components/MeetingList';
import SearchForm from '../components/SearchForm';
import ListCategories from '../components/common/ListCategories';
import TopNavBar from '../components/common/TopNavBar';
import useSetMeetingList from '../hooks/useSetMeetingList';
import { AppState } from '../types/AppTypes';

export default function HomePage() {
  const { isLoading, isError } = useSetMeetingList();
  const { meetingList, sortbyKeyword } = useSelector((state: AppState) => state.home);

  return (
    <>
      {isLoading && <div>로딩중 입니다...</div>}
      {isError && <div>에러가 발생...</div>}
      <TopNavBar />
      <ListCategories currSortbyKeyword={sortbyKeyword} />
      <SearchForm />
      {sortbyKeyword === 'calendar' && <Calendar />}
      {meetingList && meetingList.length !== 0 && (
        <MeetingList currMeetingList={meetingList} sortbyKeyword={sortbyKeyword} />
      )}
    </>
  );
}
