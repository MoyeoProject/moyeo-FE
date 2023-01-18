import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getAttendList } from '../../services/api';
import { Box, Member, MemberBox, Out } from '../../styles/DetailAttendListStyle';
import { MemberTypes } from '../../types/DetailTypes';
import FollowButton from './FollowButton';

const DetailAttendList = ({ data }: any) => {
  const { id } = useParams();
  const { data: member } = useQuery(['member'], () => {
    return getAttendList(id);
  });
  const masterId = data?.masterId;
  const maxNum = data?.maxNum;
  const currentNum = member?.data.data.length;

  return (
    <Box>
      <p>
        참여인원 {currentNum}
        <span> / {maxNum}</span>
      </p>
      {member?.data.data.map((m: MemberTypes) => {
        return (
          <MemberBox key={m.userId}>
            {m.userId === masterId ? (
              <>
                <Member>
                  <div className="masterParents">
                    <img
                      src={
                        m.profileUrl !== null
                          ? m.profileUrl
                          : 'https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927'
                      }
                    />
                    <span className="master">🎖️</span>
                  </div>
                  <span>{m.username}</span>
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
