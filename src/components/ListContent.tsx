import { Link } from 'react-router-dom';

import lock_icon from '../assets/lock_icon.svg';
import { Category, Content, ListContentWrap, Title } from '../styles/ListContentStyle';
import { Meeting } from '../types/AppTypes';
import { setDate, setTime } from '../utils/utils';

export default function ListContent({ currMeeting }: { currMeeting: Meeting }) {
  const {
    title,
    category,
    startTime,
    startDate,
    duration,
    secret,
    id,
    platform,
    attendantsNum,
    maxNum,
  } = currMeeting;

  return (
    <ListContentWrap>
      <Link to={`/detail/${id}`}>
        <div>
          <Category>
            <span>{category}</span>
            {secret && <img src={lock_icon} />}
            <p>{attendantsNum && maxNum ? `${attendantsNum}/${maxNum}` : null}</p>
          </Category>
          <Title>
            <h3>{title}</h3>
          </Title>
          <Content>
            <span>{`${platform} |`}</span>
            <span>{` ${setDate(startDate)} |`}</span>
            <span>{` ${setTime(startTime)} ${duration}h ~`}</span>
          </Content>
        </div>
      </Link>
    </ListContentWrap>
  );
}
