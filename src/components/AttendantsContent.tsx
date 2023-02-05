import more_icon from '../assets/more_icon.svg';
import user_img from '../assets/user_img.svg';
import { AttendantsProfileWrap, ImgWrap } from '../styles/AttendantsContentStyle';
import { AttendantsList } from '../types/AppTypes';

export default function AttendantsContent({
  attendantsList,
  attendantsNum,
  maxNum,
}: {
  attendantsList: AttendantsList[];
  attendantsNum: number;
  maxNum: number;
}) {
  const attendantsProfile = attendantsList.length > 3 ? attendantsList.slice(0, 3) : attendantsList;
  const attendantsCount =
    attendantsList.length > 3 ? attendantsList.length - attendantsList.slice(0, 3).length : 0;

  return (
    <AttendantsProfileWrap>
      {attendantsProfile.map((attendant, index) => (
        <ImgWrap key={attendant.userId} index={index}>
          <img src={attendant.userProfileImg ? attendant.userProfileImg : user_img} />
        </ImgWrap>
      ))}
      {attendantsCount && <img src={more_icon} alt={more_icon} />}
      <p>{attendantsNum && maxNum && `인원 ${attendantsNum} / ${maxNum}`}</p>
    </AttendantsProfileWrap>
  );
}
