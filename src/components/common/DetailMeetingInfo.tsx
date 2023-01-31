import { ReactComponent as Frame_category } from '../../assets/Frame_category.svg';
import { ReactComponent as Frame_platform } from '../../assets/Frame_platform.svg';
import { ReactComponent as BadIcon } from '../../assets/bad_icon.svg';
import { ReactComponent as CalendarDetail } from '../../assets/calendar_detail.svg';
import { ReactComponent as ClockIcon } from '../../assets/clock_icon.svg';
import { ReactComponent as GoodIcon } from '../../assets/good_icon.svg';
import { MeetingCategoryBox, MeetingInfoBox } from '../../styles/DetailMeetingInfoStyle';
import { setDate, setTime } from '../../utils/utils';

const DetailMeetingInfo = ({ data }: any) => {
  const time = setTime(data?.startTime);
  const today = setDate(data?.startDate);

  // console.log(data);
  return (
    <>
      <MeetingCategoryBox>
        <div className="meetingBox">
          <div className="meetingImg">
            {/* null이면 기본이미지 */}
            <img />
          </div>
          <div className="meetingInfo">
            <div className="meetingPlatform">{data.platform}</div>
            <p className="meetingTitle">{data?.title}</p>
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
    </>
  );
};

export default DetailMeetingInfo;
