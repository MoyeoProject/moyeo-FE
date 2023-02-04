import { Link } from 'react-router-dom';

import lock_icon from '../assets/lock_icon.svg';
import { Content, ContentWrap, SecretWrap } from '../styles/ListContentStyle';
import { Meeting } from '../types/AppTypes';
import { setDate, setTime } from '../utils/utils';

export default function ListContent({ currMeeting }: { currMeeting: Meeting }) {
  const { title, category, startTime, startDate, duration, secret, id, platform } = currMeeting;

  return (
    <Link to={`/detail/${id}`}>
      <ContentWrap>
        <p>{category}</p>
        <h3>{title}</h3>
        <Content>
          <span>{`${platform} |`}</span>
          <span>{` ${setDate(startDate)} |`}</span>
          <span>{` ${setTime(startTime)} ${duration}h ~`}</span>
        </Content>
      </ContentWrap>
      <SecretWrap>{secret && <img src={lock_icon} />}</SecretWrap>
    </Link>
  );
}
