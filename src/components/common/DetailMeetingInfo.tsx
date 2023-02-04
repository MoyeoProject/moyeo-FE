import { useState } from 'react';
import { createPortal } from 'react-dom';

import { ReactComponent as IconBad } from '../../assets/bad_icon.svg';
import { ReactComponent as DetailBasicImg } from '../../assets/detail_basic_img.svg';
import { ReactComponent as IconGood } from '../../assets/good_icon.svg';
import { ReactComponent as ImageEditIcon } from '../../assets/n_imgEdit.svg';
import { MeetingCategoryBox, MeetingInfoBox } from '../../styles/DetailMeetingInfoStyle';
import { setDate, setTime } from '../../utils/utils';
import { DetailImgEditModal } from '../DetailImgEditModal';

const DetailMeetingInfo = ({ data, meetingAfter }: { data: any; meetingAfter: boolean }) => {
  const [showModal, setShowModal] = useState(false);

  const time = setTime(data?.startTime);
  const today = setDate(data?.startDate);

  return (
    <>
      <MeetingCategoryBox>
        <div className="meetingBox">
          <div className="meetingImg">
            {data?.image ? <img src={data.image} /> : <DetailBasicImg />}
            {data?.master ? (
              !meetingAfter ? (
                <p
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <ImageEditIcon />
                </p>
              ) : null
            ) : null}
          </div>
          <div className="meetingInfo">
            <div className="meetingPlatform">{data.platform}</div>
            <p className="meetingTitle">{data?.title}</p>
            {!meetingAfter ? null : (
              <div className="iconBox">
                <div>
                  <IconGood />
                  <p>{data?.likeNum}</p>
                </div>
                <div>
                  <IconBad />
                  <p>{data?.hateNum}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <MeetingInfoBox>
          <div className="infoBox">
            <p>일정</p>
            <div className="infoContentBox">
              <p>모임 날짜 &nbsp;&nbsp; {today}</p>
              <p>
                시작 시간 &nbsp;&nbsp; {time} ~ {data?.duration}시간
              </p>
            </div>
          </div>
          <div className="infoBox">
            <p>소개</p>
            <div className="infoContentBox">{data?.content}</div>
          </div>
        </MeetingInfoBox>
      </MeetingCategoryBox>

      {showModal &&
        createPortal(
          <DetailImgEditModal onClose={() => setShowModal(false)} id={data?.id} />,
          document.body
        )}
    </>
  );
};

export default DetailMeetingInfo;
