import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { ReactComponent as FramePlusIcon } from '../../assets/Frame_plus.svg';
import { ReactComponent as Frame_user } from '../../assets/Frame_user.svg';
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
                  <div className="imgBox">
                    {m.profileUrl !== null ? <img src={m.profileUrl} /> : <Frame_user />}
                  </div>
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
                  <div className="imgBox">
                    {m.profileUrl !== null ? <img src={m.profileUrl} /> : <Frame_user />}
                  </div>
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
