import calendar_icon from '../assets/calendar_icon.svg';
import category_img from '../assets/category_img.svg';
import lock_icon from '../assets/lock_icon.svg';
import profile_img from '../assets/profile_img.svg';
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
  const { title, content, startTime, startDate, duration, secret } = currMeeting;

  return (
    <ListContentWrap>
      <LeftBox>
        <Title>
          <img src={profile_img} />
          <h3>{title}</h3>
          {secret && <img src={lock_icon} />}
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
    </ListContentWrap>
  );
}
