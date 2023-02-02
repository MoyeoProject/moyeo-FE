import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import meeting_img from '../assets/meeting_img.svg';
import ListContent from '../components/ListContent';
import TopNavBar from '../components/common/TopNavBar';
import { getSortbyMeetings } from '../services/api';
import { loadItem, saveItem } from '../services/storage';
import { ExceptionWrap } from '../styles/CalendarListStyle';
import { MeetingImg, MeetingListWrap, MeetingWrap } from '../styles/MeetingListStyle';
import { Meeting } from '../types/AppTypes';

export default function SearchPage() {
  const queryClient = useQueryClient();

  useEffect(() => {
    saveItem('keyword', '');
    saveItem('category', '');
    queryClient.resetQueries({ queryKey: ['nextMeetings'] });
    queryClient.resetQueries({ queryKey: ['meetings'] });
  }, []);

  const { data } = useQuery({
    queryKey: ['meetings'],
    queryFn: () => getSortbyMeetings(loadItem('keyword')),
  });

  return (
    <>
      <TopNavBar name={'search'} />
      <MeetingListWrap keyword={loadItem('keyword')}>
        {data?.data.data.meetingList.length === 0 ? (
          <ExceptionWrap>
            <p>검색 결과가 없습니다</p>
          </ExceptionWrap>
        ) : (
          data?.data.data.meetingList.map((meeting: Meeting) => (
            <MeetingWrap key={meeting.id}>
              <MeetingImg
                keyword={loadItem('keyword')}
                src={!meeting.img ? meeting_img : meeting.img}
                alt={!meeting.img ? meeting_img : meeting.img}
              />
              <ListContent currMeeting={meeting} />
            </MeetingWrap>
          ))
        )}
      </MeetingListWrap>
    </>
  );
}
