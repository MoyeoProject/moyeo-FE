import { useSelector } from 'react-redux';

import SearchForm from '../components/SearchForm';
import ListCategories from '../components/common/ListCategories';
import ListItems from '../components/common/ListItems';
import TopNavBar from '../components/common/TopNavBar';
import useSetMeetingList from '../hooks/useSetMeetingList';
import { AppState } from '../types/AppTypes';

export default function HomePage() {
  const { meetingList, sortbyKeyword } = useSelector((state: AppState) => state.appReducer);
  const { isLoading, isError } = useSetMeetingList();

  return (
    <>
      {isLoading ? <div>로딩중 입니다...</div> : null}
      {isError ? <div>에러가 발생...</div> : null}
      <TopNavBar />
      <ListCategories currSortbyKeyword={sortbyKeyword} />
      <SearchForm />
      {meetingList && meetingList.length !== 0 ? (
        <ListItems currMeetingList={meetingList} sortbyKeyword={sortbyKeyword} />
      ) : null}
    </>
  );
}
