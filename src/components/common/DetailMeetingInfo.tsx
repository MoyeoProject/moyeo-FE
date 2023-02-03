import { useState } from 'react';
import { createPortal } from 'react-dom';

import { ReactComponent as BadIcon } from '../../assets/bad_icon.svg';
import { ReactComponent as DetailBasicImg } from '../../assets/detail_basic_img.svg';
import { ReactComponent as EditIcon } from '../../assets/edit_icon.svg';
import { ReactComponent as GoodIcon } from '../../assets/good_icon.svg';
// import { editImageApi } from '../../services/api';
import { MeetingCategoryBox, MeetingInfoBox } from '../../styles/DetailMeetingInfoStyle';
import { setDate, setTime } from '../../utils/utils';
import { DetailImgEditModal } from '../DetailImgEditModal';

const DetailMeetingInfo = ({ data, meetingStart }: { data: any; meetingStart: boolean }) => {
  const [showModal, setShowModal] = useState(false);

  const time = setTime(data?.startTime);
  const today = setDate(data?.startDate);

  return (
    <>
      <MeetingCategoryBox>
        <div className="meetingBox">
          <div className="meetingImg">
            {/* null이면 기본이미지 */}
            {data?.image ? <img src={data.image} /> : <DetailBasicImg />}
            {data?.master ? (
              !meetingStart ? (
                <p
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <EditIcon />
                </p>
              ) : null
            ) : null}
          </div>
          <div className="meetingInfo">
            <div className="meetingPlatform">{data.platform}</div>
            <p className="meetingTitle">{data?.title}</p>
            {!meetingStart ? null : (
              <div className="iconBox">
                <div>
                  <GoodIcon />
                  <p>{data?.likeNum}</p>
                </div>
                <div>
                  <BadIcon />
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
