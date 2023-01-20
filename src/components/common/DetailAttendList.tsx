import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { ReactComponent as FramePlusIcon } from '../../assets/Frame_plus.svg';
import Frame_user from '../../assets/category_img.svg';
import { Box, Member, MemberBox, Out } from '../../styles/DetailAttendListStyle';
import { MemberTypes } from '../../types/DetailTypes';
import FollowButton from './FollowButton';

// type DetailAttendType = {
//   data: DetailTypes[]
//   member: MemberTypes[]
//  서로 다른 두 데이터를 props으로 넘길
// }

const DetailAttendList = ({ data, member }: any) => {
  const masterId = data?.masterId;
  const maxNum = data?.maxNum;
  const currentNum = member?.length;
  return (
    <Box>
      <p>
        참여인원 {currentNum}
        <span> / {maxNum}</span>
      </p>
      {member?.map((m: MemberTypes) => {
        return (
          <MemberBox key={m.userId}>
            {m.userId === masterId ? (
              <>
                <Member>
                  <img
                    src={
                      m.profileUrl !== null
                        ? m.profileUrl
                        : 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927'
                    }
                  />
                  <div>
                    <span>{m.username}</span>
                    <FramePlusIcon />
                  </div>
                </Member>
                <FollowButton userId={m.userId} followed={m.followed} />
              </>
            ) : (
              <>
                <Member>
                  <img
                    src={
                      m.profileUrl !== null
                        ? m.profileUrl
                        : 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927'
                    }
                  />
                  <span>{m.username}</span>
                </Member>
                {data?.master ? (
                  <div>
                    <Out>내보내기</Out>
                    {/* <FollowButton userId={m.userId} followed={m.followed} /> */}
                    <FollowButton userId={m.userId} followed={m.followed} />
                  </div>
                ) : (
                  <FollowButton userId={m.userId} followed={m.followed} />
                )}
              </>
            )}
          </MemberBox>
        );
      })}
    </Box>
  );
};

export default DetailAttendList;
