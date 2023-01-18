import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import { getEditingMeeting } from '../services/api';
import { HomeButton } from '../styles/ButtonStyle';
import { Meeting } from '../types/AppTypes';
import PostButton from './common/PostButton';

export default function ButtonContent({ currMeeting }: { currMeeting: Meeting }) {
  const { master, attend, secret, id } = currMeeting;

  const { refetch } = useQuery({
    queryKey: ['editingMeeting'],
    queryFn: () => getEditingMeeting(id),
    enabled: false,
  });

  const handleClickEdit = () => {
    refetch();
  };

  return (
    <>
      {master ? (
        <Link to={`/post/${id}`}>
          <HomeButton type="button" onClick={() => handleClickEdit()}>
            수정
          </HomeButton>
        </Link>
      ) : attend ? (
        <PostButton currMeeting={currMeeting} />
      ) : secret ? (
        <PostButton currMeeting={currMeeting} />
      ) : (
        <PostButton currMeeting={currMeeting} />
      )}
    </>
  );
}
