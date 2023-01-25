import { ReactComponent as Frame_category } from '../../assets/Frame_category.svg';
import { ReactComponent as Frame_platform } from '../../assets/Frame_platform.svg';
import { ReactComponent as BadIcon } from '../../assets/bad_icon.svg';
import { ReactComponent as CalendarDetail } from '../../assets/calendar_detail.svg';
import { ReactComponent as ClockIcon } from '../../assets/clock_icon.svg';
import { ReactComponent as GoodIcon } from '../../assets/good_icon.svg';
import {
  DetailInfoBox,
  MeetingCategoryBox,
  MeetingInfoBox,
} from '../../styles/DetailMeetingInfoStyle';
import { setDate, setTime } from '../../utils/utils';

const DetailMeetingInfo = ({ data, isLoading, isError }: any) => {
  const time = setTime(data?.startTime);
  const today = setDate(data?.startDate);
  return (
    <>
      {/* {isLoading ? <h2>로딩중입니다</h2> : null}
      {isError ? <h2>문제가 생겼습니다</h2> : null} */}
      <DetailInfoBox>
        <MeetingCategoryBox>
          <div className="meetingBox">
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
          <div className="meetingText">{data?.content}</div>
        </MeetingCategoryBox>
        <MeetingInfoBox>
          <p>{data?.title}</p>
          <div className="infoContentBox">
            <div className="dateInfo">
              <div>
                <CalendarDetail />
                <p>{today}</p>
              </div>
              <div>
                <ClockIcon />
                <p>
                  {time} ~ {data?.duration}시간
                </p>
              </div>
            </div>
          </div>
        </MeetingInfoBox>
      </DetailInfoBox>
    </>
  );
};

export default DetailMeetingInfo;
