import { useState } from 'react';
import { createPortal } from 'react-dom';

import Frame_user from '../assets/Frame_user.svg';
import calendar_icon from '../assets/calendar_icon.svg';
import category_img from '../assets/category_img.svg';
import lock_icon from '../assets/lock_icon.svg';
import time_icon from '../assets/time_icon.svg';
import ModalForm from '../components/common/ModalForm';
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
  const [showModal, setShowModal] = useState(false);

  const {
    title,
    content,
    startTime,
    startDate,
    duration,
    attend,
    secret,
    maxNum,
    attendantsNum,
    password,
    id,
  } = currMeeting;

  const handleClickConfirm = (inputField: string | null) => {
    location.assign(`/detail/${id}`);
  };

  return (
    <>
      <ListContentWrap>
        <button
          type="button"
          onClick={() =>
            !attend && secret ? setShowModal(true) : location.assign(`/detail/${id}`)
          }
          disabled={maxNum !== attendantsNum ? false : true}
        >
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
        </button>
      </ListContentWrap>
      {showModal &&
        createPortal(
          <ModalForm
            password={password}
            onClickConfirm={handleClickConfirm}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </>
  );
}
