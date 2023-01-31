import { Link } from 'react-router-dom';

import Frame_user from '../assets/Frame_user.svg';
import calendar_icon from '../assets/calendar_icon.svg';
import category_img from '../assets/category_img.svg';
import lock_icon from '../assets/lock_icon.svg';
import time_icon from '../assets/time_icon.svg';
import {
  Content,
  LeftBox,
  ListContentWrap,
  RightBox,
  SubContent,
  Title,
} from '../styles/ListContentStyle';
import { Meeting } from '../types/AppTypes';
import { setDate, setTime } from '../utils/utils';

export default function ListContent({ currMeeting }: { currMeeting: Meeting }) {
  const { title, content, startTime, startDate, duration, secret, maxNum, attendantsNum, id } =
    currMeeting;

  return (
    <>
      <ListContentWrap>
        <Link to={`/detail/${id}`}>
          <LeftBox>
            <Title>
              <img src={Frame_user} />
              <h3>{title}</h3>
              {secret && <img src={lock_icon} />}
              <span>{maxNum === attendantsNum ? '마감' : null}</span>
            </Title>
            <Content>
              <p>{content}</p>
            </Content>
            <SubContent>
              <img src={calendar_icon} />
              <p>{setDate(startDate)}</p>
            </SubContent>
            <SubContent>
              <img src={time_icon} />
              <p>{`${setTime(startTime)} ${duration}시간 ~`}</p>
            </SubContent>
          </LeftBox>
          <RightBox>
            <img src={category_img} />
          </RightBox>
        </Link>
      </ListContentWrap>
    </>
  );
}
